import { Note } from "shared";
import { GeneralError } from "../../controllers/error-handler";
import { NoteDomain } from "../../domains/note.domain";
import UpdateNoteDto from "../../dtos/note/update-note.dto";

const updateNoteUseCase = async (dto: UpdateNoteDto): Promise<Note> => {
  const { repository, id, title, body } = dto;
  const note = await repository.getNote(id);
  if (!note) throw new GeneralError("Note not found", 404);

  const domain = new NoteDomain(note);

  const now = new Date(Date.now());

  if (title) {
    domain.setTitle(title);
    domain.setUpdatedAt(now);
  }

  if (body) {
    domain.setBody(body);
    domain.setUpdatedAt(now);
  }

  const result = await repository.updateNote(domain.toJson());
  return result;
};

export default updateNoteUseCase;
