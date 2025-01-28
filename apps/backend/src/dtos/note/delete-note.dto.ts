import { DeleteNote } from "shared";
import { NoteRepository } from "../../repositories/note.repository";

export default interface DeleteNoteDto extends DeleteNote {
  repository: NoteRepository;
}
