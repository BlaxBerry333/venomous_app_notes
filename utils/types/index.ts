import type { NoteDataType as ProtoNoteDataType } from "venomous_app_protobuf/ts/notes";

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
};
