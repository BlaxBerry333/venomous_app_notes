import { NoteModel } from "~/server/models";
import { deleteRedisKey, getRedisKeysByPattern } from "~/server/utils/handle-redis";
import { AccountDataType, CommonResponseDataType, NoteDataType } from "~/utils/types";

export type DeleteNoteDataReturnType = CommonResponseDataType<{
  note: NoteDataType;
  message: string;
}>;

/**
 * DELETE /api/note/<id>
 */
export default defineEventHandler(async (event): Promise<DeleteNoteDataReturnType> => {
  try {
    const authorization = event.node.req.headers.authorization;
    const accessToken = authorization?.split(" ")[1];
    if (!accessToken) {
      event.node.res.statusCode = 401;
      return {
        code: 401,
        error: "[401] Unauthorized",
        data: null,
      };
    }

    const decodedToken = verifyToken<AccountDataType>(accessToken);

    if (!decodedToken.data) {
      event.node.res.statusCode = 401;
      return {
        code: 401,
        error: "[401] Unauthorized",
        data: null,
      };
    }

    // ------------------------------------------------------------------------------------------

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

    const deletedNote = await NoteModel.findOneAndDelete({
      _id: noteId,
    });
    if (!deletedNote) {
      event.node.res.statusCode = 404;
      return {
        code: 404,
        error: "[404] Note not found.",
        data: null,
      };
    }

    const REDIS_KEYS: string[] = await getRedisKeysByPattern("note-list:*");
    if (REDIS_KEYS.length > 0) {
      await deleteRedisKey(REDIS_KEYS);
    }
    const REDIS_KEY: string = `note-${noteId}`;
    await deleteRedisKey(REDIS_KEY);

    // ------------------------------------------------------------------------------------------

    event.node.res.statusCode = 200;
    return {
      code: 200,
      error: null,
      data: {
        note: deletedNote,
        message: "Note deleted successfully.",
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
