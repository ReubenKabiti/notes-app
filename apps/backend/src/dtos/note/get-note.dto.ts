import { GetNote } from "shared";
import { NoteRepository } from "../../repositories/note.repository";

export default interface GetNoteDto extends GetNote {
  repository: NoteRepository;
}
