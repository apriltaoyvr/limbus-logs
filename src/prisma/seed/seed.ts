import prisma from '@/prisma';
import sinners from './sinners.json';

async function main() {
  const createSinners = await prisma.sinner.createMany({
    data: sinners,
    skipDuplicates: true
  })

  return createSinners;
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });