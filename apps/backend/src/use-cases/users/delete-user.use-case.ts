import { User } from "shared";
import { UserRepository } from "../../repositories/user.repository";
import { GeneralError } from "../../controllers/error-handler";
import { UserDomain } from "../../domains/user.domain";
import DeleteUserDto from "../../dtos/user/delete-user.dto";

const deleteUserUseCase = async (dto: DeleteUserDto): Promise<User> => {
  const { repository, id } = dto;
  const user = await repository.getUser({ id });
  if (!user) throw new GeneralError("User not found", 404);
  const domain = new UserDomain(user);
  domain.delete(new Date());
  const deletedUser = await repository.updateUser(domain.toJson());
  return deletedUser;
};

export default deleteUserUseCase;
