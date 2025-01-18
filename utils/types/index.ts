import type { NoteDataType as ProtoNoteDataType } from "venomous_app_protobuf/ts/notes";

export type CommonResponseDataType<T, DataType = undefined> = {
  code: number;
  error: null | string;
  data: null | (DataType extends undefined ? T : DataType);
};

// ------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------

export enum SelectableNoteType {
  RAFT = "RAFT",
  ALL = "ALL",
}

export type NoteDataType = {
  _id: ProtoNoteDataType["Id"];
  type: SelectableNoteType;
  title: ProtoNoteDataType["title"];
  message: ProtoNoteDataType["message"];
  created_at: ProtoNoteDataType["createdAt"];
  updated_at: ProtoNoteDataType["updatedAt"];
  account_id: string;
};

export type AccountDataType = {
  _id: string;
  display_name: string;
  password: string;
  email: string;
  avatar: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
};
