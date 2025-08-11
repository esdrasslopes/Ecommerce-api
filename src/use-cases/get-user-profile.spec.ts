import { describe, it, expect, beforeEach } from "vitest";

import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users.repository";

import { GetUserProfilUseCase } from "./get-user-profile";

import { hash } from "bcrypt";

let usersRepository: InMemoryUsersRepository;

let sut: GetUserProfilUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();

    sut = new GetUserProfilUseCase(usersRepository);
  });

  it("should be able to authenticate", async () => {
    const createdUser = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      userId: createdUser.id,
    });

    expect(user.id).toEqual(expect.any(String));
  });
});
