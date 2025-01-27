import { Timestamps } from "./common.types";

export interface User extends Timestamps {
  id: string;
  username: string;
  email: string;
}

export interface UserWithPW extends User {
  password: string;
}

export interface RegisterUser {
  username: string;
  email: string;
  password: string;
}

export interface GetUser {
  id?: string;
  email?: string;
}

enum UpdateUserCommands {
  DELETE = "Delete User",
  UPDATE = "Update User",
}

export interface UpdateUser {
  username: string | null;
  email: string | null;
  command: UpdateUserCommands;
}
