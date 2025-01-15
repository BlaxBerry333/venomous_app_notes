import { NoteModel } from "~/server/models";
import { deleteRedisKey } from "~/server/utils/handle-redis";
import { NoteDataType } from "~/utils/types";

export type PutNoteDataRequestBodyType = NoteDataType;

export type PutNoteDataReturnType = {
  code: number;
  error: null | string;
  data: null | {
    note: NoteDataType;
    message: string;
  };
};

/**
 * PUT /api/note/<id>
 */
export default defineEventHandler(async (event): Promise<PutNoteDataReturnType> => {
  try {
    const noteId = event.context.params?.id;
    if (!noteId) {
      return {
        code: 400,
        error: "[bad request] Note ID is required.",
        data: null,
      };
    }

    const body = (await readBody(event)) as PutNoteDataRequestBodyType;

    const updatedNote = await NoteModel.findOneAndUpdate(
      { _id: noteId },
      {
        ...body,
        updated_at: new Date().toISOString(),
      },
      { new: true },
    );

    const REDIS_KEY: string = `note-${noteId}`;

    await deleteRedisKey(REDIS_KEY);

    // ------------------------------------------------------------------------------------------

    return {
      code: 200,
      error: null,
      data: {
        note: updatedNote as NoteDataType,
        message: "Note updated successfully.",
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
