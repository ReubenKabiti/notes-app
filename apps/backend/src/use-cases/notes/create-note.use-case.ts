import { ulid } from "ulid";
import { NoteDomain } from "../../domains/note.domain";
import CreateNoteDto from "../../dtos/note/create-note.dto";
import { Note } from "@prisma/client";

const createNoteUseCase = async (dto: CreateNoteDto): Promise<Note> => {
  const { repository, createNote } = dto;
  const id = ulid();
  const now = new Date(Date.now());
  const domain = new NoteDomain({
    id,
    created_at: now,
    updated_at: now,
    deleted_at: null,
    ...createNote,
  });

  const result = await repository.createNote(domain.toJson());
  return result;
};
export default createNoteUseCase;
