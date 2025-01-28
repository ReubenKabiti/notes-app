import { UserRepository } from "../../repositories/user.repository";

export default interface DeleteUserDto {
  repository: UserRepository;
  id: string;
}
