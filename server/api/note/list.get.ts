import { NoteDataType } from "~/utils/types";
import { NoteModel } from "~/server/models";
import { getRedisKey, setRedisKey } from "~/server/utils/handle-redis";

export type GetNoteListQueriesType = {
  type: NoteDataType["type"]; // 笔记类型
  sort: string; // 排序字段
  order_by: "asc" | "desc"; // 升序或降序
  page: number; // 当前页数
  count: number; // 当前页的展示数量
};

export type GetNoteListReturnType = {
  code: number;
  error: null | string;
  data: null | ListPageDataType;
};

type ListPageDataType = {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  notes: Array<NoteDataType>;
};

/**
 * GET /api/note/list
 *
 * @example
 * /api/note/list
 * /api/note/list?type=RAFT
 * /api/note/list?sort=created_at&order_by=asc
 * /api/note/list?page=1&count=10
 */
export default defineEventHandler(async (event): Promise<GetNoteListReturnType> => {
  try {
    const searchQueries = getQuery(event) as GetNoteListQueriesType;

    // ------------------------------------------------------------------------------------------

    const orderField = searchQueries?.sort || "created_at";
    const sortOption = searchQueries?.order_by === "asc" ? 1 : -1;
    const typeField = searchQueries?.type || "ALL";
    const page = searchQueries?.page || 1;
    const count = searchQueries?.count || 10;

    const filterFields: Partial<NoteDataType> = {};
    if (typeField !== "ALL") filterFields.type = typeField;

    // ------------------------------------------------------------------------------------------

    const REDIS_KEY: string = `note-list:${orderField}:${sortOption}:${typeField}:${page}:${count}`;

    const redisCachedNotes = await getRedisKey<ListPageDataType>(REDIS_KEY);
    if (redisCachedNotes) {
      return {
        code: 200,
        error: null,
        data: redisCachedNotes,
      };
    }

    // ------------------------------------------------------------------------------------------

    const notes = await NoteModel.find(filterFields)
      .sort({ [orderField]: sortOption })
      .skip((page - 1) * count)
      .limit(count);

    const totalCount = await NoteModel.countDocuments();

    const pageData = {
      totalCount,
      totalPages: Math.ceil(totalCount / count),
      currentPage: page,
      notes,
    };

    // ------------------------------------------------------------------------------------------

    await setRedisKey(REDIS_KEY, pageData, 60 * 5);

    return {
      code: 200,
      error: null,
      data: pageData,
    };
  } catch (error) {
    return {
      code: 500,
      error: (error as Error).message,
      data: null,
    };
  }
});
