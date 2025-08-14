import { IUsersRepository } from "@/repositories/repositories-types/users-repository";

import { User } from "@prisma/client";

import { hash } from "bcrypt";

import { UserAlreadyExistsError } from "../errors/user-already-exists-error";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  private usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const password_hash = await hash(password, 6);

    const user: User = await this.usersRepository.create({
      name,
      email,
      password_hash,
    });

    return { user };
  }
}
