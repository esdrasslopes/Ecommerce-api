import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";

import { GetUserProfilUseCase } from "../users/get-user-profile";

export const makeGetUserProfileUseCase = () => {
  const usersRepository = new PrismaUsersRepository();

  const getUserProfileUseCase = new GetUserProfilUseCase(usersRepository);

  return getUserProfileUseCase;
};
