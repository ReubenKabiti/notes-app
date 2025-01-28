import { NotePage } from "shared";
import GetNotesDto from "../../dtos/note/get-notes.dto";

const getNotesUseCase = async (dto: GetNotesDto): Promise<NotePage> => {
  const { repository, ...getNotes } = dto;
  const notes = await repository.getNotes(getNotes);
  return notes;
};

export default getNotesUseCase;
