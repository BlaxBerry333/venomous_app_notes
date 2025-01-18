import { CommonResponseDataType, NoteDataType } from "~/utils/types";
import { NoteModel } from "~/server/models";
import { getRedisKey, setRedisKey } from "~/server/utils/handle-redis";

export type GetNoteDataRequestBodyType = NoteDataType;

export type GetNoteDataReturnType = CommonResponseDataType<{
  note: NoteDataType;
  message: string;
}>;

/**
 * GET /api/note/<id>
 */
export default defineEventHandler(async (event): Promise<GetNoteDataReturnType> => {
  try {
    const noteId = event.context.params?.id;

    // ------------------------------------------------------------------------------------------

    if (!noteId) {
      event.node.res.statusCode = 400;
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
      event.node.res.statusCode = 200;
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
      event.node.res.statusCode = 404;
      return {
        code: 404,
        error: "[404] Note not found.",
        data: null,
      };
    }

    await setRedisKey(REDIS_KEY, note, 60 * 5);

    // ------------------------------------------------------------------------------------------

    event.node.res.statusCode = 200;
    return {
      code: 200,
      error: null,
      data: {
        note,
        message: "ok",
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
