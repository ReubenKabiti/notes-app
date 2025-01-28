import { Note, Timestamps } from "shared";

export class NoteDomain {
  private _id: string;
  private _title: string;
  private _body: string;
  private _creator_name: string;
  private _user_id: string;
  private _timestamps: Timestamps;

  constructor(note: Note) {
    this._id = note.id;
    this._title = note.title;
    this._body = note.body;
    this._creator_name = note.creator_name;
    this._user_id = note.user_id;
    const { created_at, updated_at, deleted_at } = note;
    this._timestamps = {
      created_at,
      updated_at,
      deleted_at,
    };
  }

  toJson(): Note {
    const { created_at, updated_at, deleted_at } = this._timestamps;
    return {
      created_at,
      updated_at,
      deleted_at,
      id: this._id,
      title: this._title,
      body: this._body,
      creator_name: this._creator_name,
      user_id: this._user_id,
    };
  }

  setUpdatedAt(date: Date) {
    this._timestamps.updated_at = date;
  }

  delete(date: Date) {
    this._timestamps.deleted_at = date;
  }

  setTitle(title: string) {
    this._title = title;
  }

  setBody(body: string) {
    this._body = body;
  }
}
