import { LoginUser } from "shared";
import { UserRepository } from "../../repositories/user.repository";

export default interface LoginUserDto {
  repository: UserRepository;
  loginUser: LoginUser;
}
