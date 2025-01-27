import { GetUser, User } from "shared";
import { UserRepository } from "../../repositories/user.repository";
import { GeneralError } from "../../controllers/error-handler";

export interface GetUserDto {
  repository: UserRepository;
  getUser: GetUser;
}

const getUserUseCase = async (dto: GetUserDto): Promise<User> => {
  const { repository, getUser } = dto;
  const { id, email, username } = getUser;
  if (!id && !email && !username)
    throw new GeneralError(
      "user id, username or email need to be provided",
      400
    );
  const result = await repository.getUser(getUser);
  if (!result) throw new GeneralError("User not found", 404);
  return result;
};

export default getUserUseCase;
