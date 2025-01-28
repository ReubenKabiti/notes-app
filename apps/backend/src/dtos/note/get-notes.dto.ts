import { GetNotes } from "shared";
import { NoteRepository } from "../../repositories/note.repository";

export default interface GetNotesDto extends GetNotes {
  repository: NoteRepository;
}
