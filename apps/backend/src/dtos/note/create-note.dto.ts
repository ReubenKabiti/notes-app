import { CreateNote } from "shared";
import { NoteRepository } from "../../repositories/note.repository";

export default interface CreateNoteDto {
  repository: NoteRepository;
  createNote: CreateNote;
}
