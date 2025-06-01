import prisma from '../index';
import sinners from './data/sinners.json';
import abnormalities from './data/abnormalities.json';
import comments from './data/comments.json';
import logs from './data/logs.json';

// Simple seed script to populate the Sinners table
async function main() {
  const createSinners = prisma.sinners.createMany({
    data: sinners,
    skipDuplicates: true,
  });

  const createAbnos = prisma.abnormalities.createMany({
    data: abnormalities.map((abno: any) => ({
      ...abno,
      riskLevel: abno.riskLevel as any, // Replace 'any' with 'RiskLevelEnum' if you can import it
    })),
    skipDuplicates: true,
  });

  const createLogs = prisma.logs.createMany({
    data: logs.map((log) => ({
      ...log,
      observationLevel: log.observationLevel ?? 0,
    })),
    skipDuplicates: true,
  });

  const createComments = prisma.comments.createMany({
    data: comments.map((comment) => {
      const { id, ...rest } = comment;
      return rest;
    }),
    skipDuplicates: true
  });
  
  await createSinners
  await createAbnos
  await createLogs
  await createComments

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
