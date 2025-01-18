import { NoteDataType } from "~/utils/types";
import { NoteModel } from "~/server/models";
import { getRedisKey, setRedisKey } from "~/server/utils/handle-redis";

export type GetNoteDataRequestBodyType = NoteDataType;

export type GetNoteDataReturnType = {
  code: number;
  error: null | string;
  data: null | {
    note: NoteDataType;
    message: string;
  };
};

/**
 * GET /api/note/<id>
 */
export default defineEventHandler(async (event): Promise<GetNoteDataReturnType> => {
  try {
    const noteId = event.context.params?.id;

    // ------------------------------------------------------------------------------------------

    if (!noteId) {
      return {
        code: 400,
        error: "[bad request] Note ID is required.",
        data: null,
      };
    }

    // ------------------------------------------------------------------------------------------

    const REDIS_KEY: string = `note-${noteId}`;
    const redisCachedNote = await getRedisKey<NoteDataType>(REDIS_KEY);
    if (redisCachedNote) {
      return {
        code: 200,
        error: null,
        data: {
          note: redisCachedNote,
          message: "ok",
        },
      };
    }

    // ------------------------------------------------------------------------------------------

    const note = await NoteModel.findOne({
      _id: noteId,
    });
    if (!note) {
      return {
        code: 404,
        error: "[404] Note not found.",
        data: null,
      };
    }

    await setRedisKey(REDIS_KEY, note, 60 * 5);

    // ------------------------------------------------------------------------------------------

    return {
      code: 200,
      error: null,
      data: {
        note,
        message: "ok",
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
