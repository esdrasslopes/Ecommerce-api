import { IUsersRepository } from "../repositories-types/users-repository";

import { Prisma, User } from "@prisma/client";

import { randomUUID } from "crypto";

export class InMemoryUsersRepository implements IUsersRepository {
  private items: User[] = [];

  async create(data: Prisma.UserCreateInput) {
    const user: User = {
      id: randomUUID(),
      email: data.email,
      name: data.name,
      created_at: new Date(),
      password_hash: data.password_hash,
      role: "MEMBER",
    };

    this.items.push(user);

    return user;
  }

  async findByEmail(email: string) {
    const user = this.items.find((user) => user.email === email);

    if (!user) {
      return null;
    }

    return user;
  }
}
