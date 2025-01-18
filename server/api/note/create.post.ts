import { NoteModel } from "~/server/models";
import { deleteRedisKey, getRedisKeysByPattern } from "~/server/utils/handle-redis";
import { AccountDataType, CommonResponseDataType, NoteDataType } from "~/utils/types";

export type PostNoteCreateRequestBodyType = Omit<
  NoteDataType,
  "_id" | "created_at" | "updated_at"
> & {
  account_id: AccountDataType["_id"];
};

export type PostNoteCreateReturnType = CommonResponseDataType<{
  note: NoteDataType;
  message: string;
}>;

/**
 * POST /api/note/create
 */
export default defineEventHandler(async (event): Promise<PostNoteCreateReturnType> => {
  try {
    const requestBody = (await readBody(event)) as PostNoteCreateRequestBodyType;

    if (!requestBody.account_id) {
      event.node.res.statusCode = 400;
      return {
        code: 400,
        error: "[400] account_id is required.",
        data: null,
      };
    }

    // ------------------------------------------------------------------------------------------

    const existedNote = await NoteModel.findOne({
      title: requestBody.title,
    });

    if (!!existedNote) {
      event.node.res.statusCode = 409;
      return {
        code: 409,
        error: "[409] Note already existed.",
        data: null,
      };
    }

    // ------------------------------------------------------------------------------------------

    const createdNote = await NoteModel.create([
      {
        type: requestBody.type,
        title: requestBody.title,
        message: requestBody.message,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        account_id: requestBody.account_id,
      },
    ]);

    const REDIS_KEYS: string[] = await getRedisKeysByPattern("note-list:*");
    if (REDIS_KEYS.length > 0) {
      await deleteRedisKey(REDIS_KEYS);
    }

    // --------------------------------------------------------------------------------

    event.node.res.statusCode = 201;
    return {
      code: 201,
      error: null,
      data: {
        note: createdNote[0],
        message: "Note created successfully.",
      },
    };
  } catch (error) {
    event.node.res.statusCode = 500;
    return {
      code: 500,
      error: (error as Error).message,
      data: null,
    };
  }
});
