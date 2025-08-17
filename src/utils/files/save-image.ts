import { pipeline } from "node:stream/promises";

import { createWriteStream } from "node:fs";

import { randomUUID } from "node:crypto";

import { MultipartFile } from "@fastify/multipart";

import { UnsuportedFileTypeError } from "@/use-cases/errors/unsupported-file-type-error";

import path from "node:path";

export const saveImage = async (file: MultipartFile) => {
  const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

  if (!allowedTypes.includes(file.mimetype)) {
    throw new UnsuportedFileTypeError();
  }

  const extension = file.mimetype.split("/")[1];

  const filename = `${randomUUID()}.${extension}`;

  const filePath = path.resolve("public", filename);

  try {
    await pipeline(file.file, createWriteStream(filePath));
  } catch (err) {
    console.error("Erro ao salvar imagem:", err);
    throw err;
  }

  return `/public/${filename}`;
};
