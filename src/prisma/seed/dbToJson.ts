import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function dbToJson() {
  const abnormalities = await prisma.abnormalities.findMany();
  const logs = await prisma.logs.findMany();
  const comments = await prisma.comments.findMany();
  const directory = "src/prisma/seed/data/"

  fs.writeFileSync(directory + `abnormalities.json`, JSON.stringify(abnormalities, null, 2));
  fs.writeFileSync(directory + `logs.json`, JSON.stringify(logs, null, 2));
  fs.writeFileSync(directory + `comments.json`, JSON.stringify(comments, null, 2));

  await prisma.$disconnect();
}

dbToJson().catch(e => {
  console.error(e);
  process.exit(1);
});
