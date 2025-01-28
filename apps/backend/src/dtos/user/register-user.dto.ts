import { RegisterUser } from "shared";
import { UserRepository } from "../../repositories/user.repository";

export default interface RegisterUserDto {
  repository: UserRepository;
  registerUser: RegisterUser;
}
