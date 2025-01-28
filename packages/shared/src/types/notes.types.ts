import { Timestamps } from "./common.types";

export interface Note extends Timestamps {
  id: string;
  title: string;
  body: string;
  creator_name: string;
  user_id: string;
}

export interface CreateNote {
  title: string;
  body: string;
  creator_name: string;
  user_id: string;
}

export interface GetNote {
  id: string;
}

export interface GetNotes {
  by_user_id?: boolean;
  by_user_id_and_date?: boolean;

  user_id?: string;
  start_date?: Date;
  end_date?: Date;

  count?: number;
  cursor?: string;
}

export interface NotePage {
  notes: Note[];
  count: number;
  next_cursor?: string;
}

export interface UpdateNote {
  id: string;
  title?: string;
  body?: string;
}

export interface DeleteNote {
  id: string;
}
