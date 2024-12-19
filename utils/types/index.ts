export enum SelectableNoteType {
  raft = "raft",
}

export type NoteDataType = {
  _id: string;
  type: SelectableNoteType;
  title: string;
  message: string;
  created_at: Date;
  updated_at: Date;
};
