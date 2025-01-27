import { LoginUser, Token } from "shared";
import { UserRepository } from "../../repositories/user.repository";
import { GeneralError } from "../../controllers/error-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { errors } from "../../util/constants";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export interface LoginUserDto {
  repository: UserRepository;
  loginUser: LoginUser;
}

const loginUserUseCase = async (dto: LoginUserDto): Promise<Token> => {
  if (!JWT_SECRET_KEY) throw new GeneralError(errors.internalServerError, 500);

  const { repository, loginUser } = dto;
  const { username, email, password } = loginUser;

  if (!username && !email)
    throw new GeneralError("Provider either username or email", 400);

  const user = await repository.getUser({ username, email });
  if (!user) throw new GeneralError("Wrong email/username or password", 400);

  if (!(await bcrypt.compare(password, user.password)))
    throw new GeneralError("Wrong password provided!", 400);

  try {
    const token = jwt.sign({ username, email }, JWT_SECRET_KEY);
    return {
      token,
    };
  } catch {
    throw new GeneralError("Failed to login", 403);
  }
};

export default loginUserUseCase;
