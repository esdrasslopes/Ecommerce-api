import { ICartsRepository } from "@/repositories/repositories-types/carts-repository";

import { Cart } from "@prisma/client";

interface CreateCartUseCaseRequest {
  userId: string;
}

interface CreateCartUseCaseResponse {
  cart: Cart;
}

export class CreateCartUseCase {
  private createCartRepository: ICartsRepository;

  constructor(createCartRepository: ICartsRepository) {
    this.createCartRepository = createCartRepository;
  }

  async execute({
    userId,
  }: CreateCartUseCaseRequest): Promise<CreateCartUseCaseResponse> {
    const cart = await this.createCartRepository.createCart(userId);

    return { cart };
  }
}
