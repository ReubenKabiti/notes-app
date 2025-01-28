import { PrismaClient } from "@prisma/client";
import { GetNotes, Note, NotePage, UpdateNote } from "shared";
import { GeneralError } from "../controllers/error-handler";
import { errors } from "../util/constants";

export interface NoteRepository {
  createNote: (note: Note) => Promise<Note>;
  getNote: (id: string) => Promise<Note | null>;
  getNotes: (getNotes: GetNotes) => Promise<NotePage>;
  updateNote: (updateNote: UpdateNote) => Promise<Note>;
}

export class PrismaNoteRepository implements NoteRepository {
  constructor(private client: PrismaClient) {}

  public async createNote(note: Note): Promise<Note> {
    const result = await this.client.note.create({ data: note });
    return result;
  }

  public async getNote(id: string): Promise<Note | null> {
    const result = await this.client.note.findFirst({ where: { id } });
    return result;
  }

  private async getByUserId(
    user_id: string,
    count?: number,
    cursor?: string
  ): Promise<Note[]> {
    const results = await this.client.note.findMany({
      where: { user_id },
      cursor: { id: cursor },
      take: count,
    });
    return results;
  }

  private async getByUserIdAndDateRange(
    userId: string,
    startDate: Date,
    endDate: Date,
    count?: number,
    cursor?: string
  ): Promise<Note[]> {
    const results = await this.client.note.findMany({
      where: {
        created_at: { gte: startDate, lte: endDate },
        user_id: userId,
      },
      cursor: { id: cursor },
      take: count,
    });
    return results;
  }

  public async getNotes(getNotes: GetNotes): Promise<NotePage> {
    let results;

    if (getNotes.by_user_id) {
      const { user_id, count, cursor } = getNotes;

      if (!user_id) throw new GeneralError("User Id must be provided", 400);

      results = await this.getByUserId(user_id, count, cursor);
    } else if (getNotes.by_user_id_and_date) {
      const { start_date, end_date, user_id, count, cursor } = getNotes;

      if (!start_date || !end_date || !user_id)
        throw new GeneralError("Provide the date and user id", 400);

      results = await this.getByUserIdAndDateRange(
        user_id,
        start_date,
        end_date,
        count,
        cursor
      );
    }

    if (!results) throw new GeneralError(errors.internalServerError, 500);

    const numRead = results.length;

    let nextCursor;

    if (results.length) nextCursor = results[results.length - 1].id;

    return {
      notes: results,
      next_cursor: nextCursor,
      count: numRead,
    };
  }

  public async updateNote(updateNote: UpdateNote): Promise<Note> {
    const { id, body, title } = updateNote;
    const result = await this.client.note.update({
      where: { id },
      data: { body, title },
    });
    return result;
  }
}
