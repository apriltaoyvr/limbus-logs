import prisma from '@/prisma';
import styles from './page.module.scss';
import HomeClient from './client';

export default async function Home() {
  // Fetch all abnormalities, then its logs, then the logs' comments from the database using Prisma
  // TODO: Infinite scrolling or pagination for performance
  const abnormalities = await prisma.abnormalities.findMany({
    include: {
      logs: {
        orderBy: {
          observationLevel: 'asc'
        },
        include: {
          comments: {
            orderBy: {
              order: 'asc',
            },
          },
        },
      },
    },
  });

  return (
    <>
      <header className={styles.intro}>
        <h1>Limbus Company Observation Log Library</h1>
        <h2>
          <strong>SPOILERS AHEAD, PROCEED WITH CAUTION!</strong>
        </h2>
        <p>
          Collection of observation logs in Limbus Company. Some may be combined
          due to identical entries, but not all. Additional comments from other
          sinners will be color-coded accordingly.
        </p>
        <footer>
          <sup>Managed by <a href="https://github.com/retcons">jordan</a>, please direct any corrections, concerns, etc. to me.
            last updated: canto v part 3 - december 1</sup>
        </footer>
      </header>
      {/*
       * Because of React adding server components
       * We split files into client and server components
       * The short of it is that where we fetch data is separate from where we interact with data
       */}
      <HomeClient abnormalities={abnormalities} />
    </>
  );
}
