import { model } from "mongoose";

import { AccountDataType, NoteDataType } from "~/utils/types";
import { AccountSchema, NoteSchema } from "../schemas";

export const NoteModel = model<NoteDataType>("Note", NoteSchema);
export const AccountModel = model<AccountDataType>("Account", AccountSchema);
