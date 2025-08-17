import { FileDoesExistsError } from "@/use-cases/errors/file-does-not-exists-error";

import { UnsuportedFileTypeError } from "@/use-cases/errors/unsupported-file-type-error";

import { saveImage } from "@/utils/files/save-image";

import { FastifyReply, FastifyRequest } from "fastify";

export const upload = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const data = await request.file();

    if (!data?.file) {
      throw new FileDoesExistsError();
    }

    const imageUrl = await saveImage(data);

    return reply.status(201).send({
      message: "File uploaded successfully",
      imageUrl,
    });
  } catch (error) {
    if (error instanceof UnsuportedFileTypeError) {
      return reply.status(400).send({
        message: error.message,
      });
    }

    if (error instanceof FileDoesExistsError) {
      return reply.status(400).send({
        message: error.message,
      });
    }

    throw error;
  }
};
