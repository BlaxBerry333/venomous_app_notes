import { NoteModel } from "~/server/models";
import { deleteRedisKey, getRedisKeysByPattern } from "~/server/utils/handle-redis";
import { NoteDataType } from "~/utils/types";

export type PostNoteCreateRequestBodyType = Omit<NoteDataType, "_id" | "created_at" | "updated_at">;

export type PostNoteCreateReturnType = {
  code: number;
  error: null | string;
  data: null | {
    note: NoteDataType;
    message: string;
  };
};

/**
 * POST /api/note/create
 */
export default defineEventHandler(async (event): Promise<PostNoteCreateReturnType> => {
  try {
    const requestBody = (await readBody(event)) as PostNoteCreateRequestBodyType;

    // ------------------------------------------------------------------------------------------

    const existedNote = await NoteModel.findOne({
      title: requestBody.title,
    });

    if (!!existedNote) {
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
      },
    ]);

    const REDIS_KEYS: string[] = await getRedisKeysByPattern("note-list:*");
    if (REDIS_KEYS.length > 0) {
      await deleteRedisKey(REDIS_KEYS);
    }

    // --------------------------------------------------------------------------------

    return {
      code: 201,
      error: null,
      data: {
        note: createdNote[0],
        message: "Note created successfully.",
      },
    };
  } catch (error) {
    return {
      code: 500,
      error: (error as Error).message,
      data: null,
    };
  }
});
