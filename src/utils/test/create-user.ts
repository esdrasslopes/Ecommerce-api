import { RegisterUseCase } from "@/use-cases/register";

import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users.repository";

export const createUser = async () => {
  const users = new InMemoryUsersRepository();

  const registerUseCase = new RegisterUseCase(users);

  const user = await registerUseCase.execute({
    name: "John Doe",
    email: "johndoe@gmail.com",
    password: "123456",
  });

  return user;
};
