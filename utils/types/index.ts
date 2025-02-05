import type {
  NoteDataType as ProtoNoteDataType,
  AccountDataType as ProtoAccountDataType,
} from "venomous_app_protobuf/ts/notes";

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
  account_id: ProtoNoteDataType["accountId"];
};

export enum AccountRoleType {
  NORMAL = "NORMAL",
  ADMIN = "ADMIN",
}

export type AccountDataType = {
  _id: ProtoAccountDataType["Id"];
  display_name: ProtoAccountDataType["displayName"];
  password: ProtoAccountDataType["password"];
  email: ProtoAccountDataType["email"];
  avatar: ProtoAccountDataType["avatar"];
  created_at: ProtoAccountDataType["createdAt"];
  updated_at: ProtoAccountDataType["updatedAt"];
  role: AccountRoleType;
  is_active: ProtoAccountDataType["isActive"];
};
