import { FastifyInstance } from "fastify";

import { verifyJwt } from "@/http/middlewares/verify-jwt";

import { createCategory } from "./create-category";

import { verifyUserRole } from "@/http/middlewares/verify-user-role";

import { createProduct } from "./create-product";

import { upload } from "./upload-image";

import { deleteProduct } from "./delete-product";

import { getDetailsOfASpecificProduct } from "./get-details-of-a-specific-product";

import { updateProduct } from "./update-product";

export const productsRoutes = async (app: FastifyInstance) => {
  app.addHook("onRequest", verifyJwt);

  app.post(
    "/create/category",
    { onRequest: [verifyUserRole("ADMIN")] },
    createCategory
  );

  app.post("/create", { onRequest: [verifyUserRole("ADMIN")] }, createProduct);

  app.post("/upload", { onRequest: [verifyUserRole("ADMIN")] }, upload);

  app.delete(
    "/delete/:id",
    { onRequest: [verifyUserRole("ADMIN")] },
    deleteProduct
  );

  app.get("/:id", getDetailsOfASpecificProduct);

  app.patch("/:id", { onRequest: [verifyUserRole("ADMIN")] }, updateProduct);
};
