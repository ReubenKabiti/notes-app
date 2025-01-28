import { UpdateNote } from "shared";
import { NoteRepository } from "../../repositories/note.repository";

export default interface UpdateNoteDto extends UpdateNote {
  repository: NoteRepository;
}
