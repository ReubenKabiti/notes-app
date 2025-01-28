import { Note } from "shared";
import { GeneralError } from "../../controllers/error-handler";
import GetNoteDto from "../../dtos/note/get-note.dto";

const getNoteUseCase = async (dto: GetNoteDto): Promise<Note> => {
  const { repository, id } = dto;
  const result = await repository.getNote(id);
  if (!result) throw new GeneralError("Note not found", 404);
  return result;
};

export default getNoteUseCase;
