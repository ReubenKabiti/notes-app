import { PrismaClient } from "@prisma/client";
import { GetUser, User, UserWithPW } from "shared";

export interface UserRepository {
  registerUser: (dto: UserWithPW) => Promise<User>;
  getUser: (dto: GetUser) => Promise<UserWithPW>;
  updateUser: (dto: UserWithPW) => Promise<User>;
}

export class PrismaUserRepository implements UserRepository {
  constructor(private client: PrismaClient) {}

  public async registerUser(dto: UserWithPW): Promise<User> {
    const { password, ...user } = await this.client.user.create({
      data: dto,
    });
    return user;
  }

  public async getUser(dto: GetUser): Promise<UserWithPW> {
    const result = await this.client.user.findFirst({
      where: { ...dto, deleted_at: null },
    });
    return result as UserWithPW;
  }

  public async updateUser(dto: UserWithPW): Promise<User> {
    const { id, ...user } = dto;
    const result = await this.client.user.update({
      where: {
        id,
      },
      data: user,
    });

    const { password, ...updatedUser } = result;
    return updatedUser;
  }
}
