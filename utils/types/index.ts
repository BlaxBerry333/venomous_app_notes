import type { NoteDataType as ProtoNoteDataType } from "venomous_app_protobuf/ts/notes";

export enum SelectableNoteType {
  raft = "raft",
}

export type NoteDataType = {
  _id: ProtoNoteDataType["Id"];
  type: SelectableNoteType;
  title: ProtoNoteDataType["title"];
  message: ProtoNoteDataType["message"];
  created_at: ProtoNoteDataType["createdAt"];
  updated_at: ProtoNoteDataType["updatedAt"];
};
