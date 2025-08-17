import fs from "node:fs/promises";

import path from "node:path";

export const deleteImage = async (imageUrl: string) => {
  if (!imageUrl) return null;

  const filePath = path.join(process.cwd(), imageUrl);

  try {
    await fs.unlink(filePath);
  } catch (error) {
    console.error(error);
  }
};
