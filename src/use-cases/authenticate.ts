import { IUsersRepository } from "@/repositories/repositories-types/users-repository";

import { User } from "@prisma/client";

import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

import { compare } from "bcrypt";

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  user: User;
}

export class AuthenticateUseCase {
  private usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatchs: boolean = await compare(
      password,
      user.password_hash
    );

    if (!doesPasswordMatchs) {
      throw new InvalidCredentialsError();
    }

    return { user };
  }
}
