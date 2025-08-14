import { describe, it, expect, beforeEach } from "vitest";

import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users.repository";

import { AuthenticateUseCase } from "./authenticate";

import { hash } from "bcrypt";

let usersRepository: InMemoryUsersRepository;

let sut: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();

    sut = new AuthenticateUseCase(usersRepository);
  });

  it("should be able to authenticate", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      email: "johndoe@gmail.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate user not registered", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      email: "johndoe@gmail.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });
});
