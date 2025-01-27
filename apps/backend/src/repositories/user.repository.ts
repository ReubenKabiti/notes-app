import { RegisterUser } from "shared";

export interface UserRepository {
  create_user: (dto: RegisterUser) => Promise<void>;
}
