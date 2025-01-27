import { Timestamps, UserWithPW } from "shared";

export class UserDomain {
  private _id: string;
  private _username: string;
  private _email: string;
  private _password: string;
  private _timestamps: Timestamps;

  constructor(user: UserWithPW) {
    this._id = user.id;
    this._username = user.username;
    this._email = user.email;
    this._password = user.password;

    const { created_at, deleted_at, updated_at } = user;

    this._timestamps = {
      created_at,
      updated_at,
      deleted_at,
    };
  }

  setUsername(username: string) {
    this._username = username;
  }

  setEmail(email: string) {
    this._email = email;
  }

  delete(date: Date) {
    if (!this._timestamps.deleted_at) throw new Error("User already deleted!");
    this._timestamps.deleted_at = date;
  }

  toJson(): UserWithPW {
    const { created_at, updated_at, deleted_at } = this._timestamps;

    return {
      id: this._id,
      email: this._email,
      username: this._username,
      password: this._password,
      created_at,
      updated_at,
      deleted_at,
    };
  }
}
