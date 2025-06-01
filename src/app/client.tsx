'use client';
import { useState } from 'react';
import SinnerToggle from '../components/Filter/SinnerToggle';
import Abnormality, { type AbnormalityProps } from '../components/Abnormality';
import { idToName } from '@/app/scripts/names';
import styles from './page.module.scss';

export default function HomeClient({
  abnormalities,
}: {
  abnormalities: AbnormalityProps[];
}) {
  // Check what Sinner is currently selected in the filter
  const [search, setSearch] = useState('');
  const [selectedSinner, setSelectedSinner] = useState('all');

  // Filter down the abnormality list to match the search query AND if a sinner wrote a log for it
  const filteredAbnormalities = abnormalities.filter((abnormality) => {
    const searchFilter = abnormality.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const sinnerFilter =
      selectedSinner === 'all'
        ? true
        : abnormality.logs.some((log) => log.sinnerId === selectedSinner);

    return searchFilter && sinnerFilter;
  });

  return (
    <>
      <nav className={styles.filter}>
        <section className={styles['filter-section']}>
          <label className={styles['filter-label']}>Abnormality</label>
          <input
            type='search'
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            className={styles['search']}
          />
        </section>
        <section className={styles['filter-section']}>
          <label className={styles['filter-label']}>Log Writer</label>
          <SinnerToggle
            selectedSinner={selectedSinner}
            setSelectedSinner={setSelectedSinner}
          />
        </section>
      </nav>
      <main className={styles.gallery}>
        {filteredAbnormalities.length > 0 ? (
          // Return the abnormalities that meet this criteria with the Abnormality component
          filteredAbnormalities.map((abnormality, index) => {
            return (
              <Abnormality abnormality={abnormality} key={abnormality.id ?? `unknown-${index}`} />
            );
          })
        ) : (
          // If no results are found, display a message
          <span className={styles.noresult}>
            No results found for{' '}
            <strong>{search === '' ? 'anything' : search}</strong> by{' '}
            <strong>{idToName(selectedSinner)}</strong>{' '}
          </span>
        )}
      </main>
    </>
  );
}
