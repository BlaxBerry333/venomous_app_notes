import { NoteModel } from "~/server/models";
import { deleteRedisKey, getRedisKeysByPattern } from "~/server/utils/handle-redis";
import { NoteDataType } from "~/utils/types";

export type DeleteNoteDataReturnType = {
  code: number;
  error: null | string;
  data: null | {
    note: NoteDataType;
    message: string;
  };
};

/**
 * DELETE /api/note/<id>
 */
export default defineEventHandler(async (event): Promise<DeleteNoteDataReturnType> => {
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

    const deletedNote = await NoteModel.findOneAndDelete({
      _id: noteId,
    });
    if (!deletedNote) {
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

    return {
      code: 200,
      error: null,
      data: {
        note: deletedNote,
        message: "Note deleted successfully.",
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
