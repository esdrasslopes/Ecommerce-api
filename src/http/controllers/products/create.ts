import { FastifyReply, FastifyRequest } from "fastify";

import { pipeline } from "node:stream/promises";

import { createWriteStream } from "node:fs";

import { randomUUID } from "node:crypto";

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const data = await request.file();

  if (!data) {
    return;
  }

  const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

  if (!allowedTypes.includes(data.mimetype)) {
    return reply.status(400).send({ error: "Invalid file type" });
  }

  const extension = data.mimetype.split("/")[1];

  const filename = `${randomUUID()}.${extension}`;

  await pipeline(data?.file!, createWriteStream(`./public/${filename}`));
};
