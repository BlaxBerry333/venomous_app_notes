import { NoteModel } from "~/server/models";
import { NoteDataType } from "~/utils/types";

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
 * GET /api/note/[id]
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
