import { FastifyInstance } from "fastify";

import { verifyJwt } from "@/http/middlewares/verify-jwt";

import { createCart } from "./create-cart";

import { addItemToCart } from "./add-item-to-cart";

import { deleteCartItem } from "./delete-cart-item";

import { updateCartItemQuantity } from "./update-cart-item-quantity";

import { getItemsFromCart } from "./get-items-from-cart";

import { getDetailsOfASpecificCartItem } from "./get-details-of-a-specific-cart-item";

export const cartsRoutes = async (app: FastifyInstance) => {
  app.addHook("onRequest", verifyJwt);

  app.post("/create/:userId", createCart);

  app.post("/create/cartItem/:cartId", addItemToCart);

  app.delete("/:cartId/:cartItemId", deleteCartItem);

  app.patch("/:cartItemId", updateCartItemQuantity);

  app.get("/:cartId", getItemsFromCart);

  app.get("/cartItem/:cartItemId", getDetailsOfASpecificCartItem);
};
