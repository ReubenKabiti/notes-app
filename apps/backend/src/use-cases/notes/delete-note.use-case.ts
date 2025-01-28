import { Note } from "shared";
import DeleteNoteDto from "../../dtos/note/delete-note.dto";
import { GeneralError } from "../../controllers/error-handler";
import { NoteDomain } from "../../domains/note.domain";

const deleteNoteUseCase = async (dto: DeleteNoteDto): Promise<Note> => {
  const { repository, id } = dto;
  const note = await repository.getNote(id);
  if (!note) throw new GeneralError("Note not found", 404);

  const domain = new NoteDomain(note);
  domain.delete(new Date(Date.now()));

  const result = await repository.updateNote(domain.toJson());
  return result;
};

export default deleteNoteUseCase;
