import { GetUser } from "shared";
import { UserRepository } from "../../repositories/user.repository";

export default interface GetUserDto {
  repository: UserRepository;
  getUser: GetUser;
}
