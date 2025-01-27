import { RegisterUser, User } from "shared";
import { UserRepository } from "../../repositories/user.repository";
import bcrypt from "bcrypt";
import { ulid } from "ulid";
import { UserDomain } from "../../domains/user.domain";

export interface RegisterUserDto {
  repository: UserRepository;
  registerUser: RegisterUser;
}

export default async function registerUserUseCase(
  dto: RegisterUserDto
): Promise<User> {
  const { repository, registerUser } = dto;
  const now = new Date(Date.now());
  const { password, username, email } = registerUser;
  const encryptedPassword = await bcrypt.hash(password, 10);
  const id = ulid();

  const domain = new UserDomain({
    id,
    username,
    email,
    created_at: now,
    updated_at: now,
    deleted_at: null,
    password: encryptedPassword,
  });

  const json = domain.toJson();
  const result = await repository.registerUser(json);
  return result;
}
