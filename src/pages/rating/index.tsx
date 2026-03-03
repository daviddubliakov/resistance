import { useEffect, useMemo, useState } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import styles from './rating.module.css';
import arrowDown from '../../assets/images/arrow_down.png';
import PaginatedCards from '../../components/paginatedCards';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getDeputies } from '../../services/getDeputies';
import PersonCardSkeleton from '../../components/personCardSkeleton';
import { TextField } from '../../components/text-field';
import { NotFoundResults } from '../../components/not-found-results/not-found-results';

const ITEMS_PER_PAGE = 12;

const RatingPage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const { data, isLoading } = useQuery({
    queryKey: ['deputies', page, debouncedSearch],
    queryFn: () => getDeputies({ page, pageSize: ITEMS_PER_PAGE, search: debouncedSearch }),
  });

  const deputies = useMemo(() => {
    const list = data?.data ?? [];
    if (list.length === 0) return [];

    const mayorIndex = list.findIndex(deputy =>
      deputy?.placeOfEmployment?.includes('Міський голова')
    );
    if (mayorIndex <= -1) return list;

    const reordered = [...list];
    const [mayor] = reordered.splice(mayorIndex, 1);
    reordered.unshift(mayor);
    return reordered;
  }, [data?.data]);

  const onSearchHandler = (value: string) => {
    setSearch(value);
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.introduction}>
          <section className="container">
            <div className={styles.breadcrumb}>
              <Link to={'/'} className={styles.breadcrumbLinkMain}>
                Головна <Icon icon="bxs:chevron-right" className={styles.breadcrumbIcon}></Icon>
              </Link>
              <p className={styles.breadcrumbLinkCurrent}>Особи</p>
            </div>
          </section>
          <section className="container">
            <div className={styles.introductionHead}>
              <p className={styles.name}>РЕЙТИНГ ЗАШКВАРІВ</p>
              <div className={styles.whiteLine}></div>
              <p className={styles.goal}>
                Перевірте, хто з депутатів міської ради найбільше засвітився в черкаських зашкварах
                і як саме.
              </p>
              <div className={styles.arrows}>
                <img src={arrowDown} alt="arrow" />
                <img src={arrowDown} alt="arrow" />
                <img src={arrowDown} alt="arrow" />
              </div>
            </div>
          </section>
        </section>
        <section className="container">
          <div className={styles.searchInput}>
            <TextField placeholder="Пошук депутата" onChange={onSearchHandler} value={search} />
          </div>
          {isLoading ? (
            <div className={styles.skeletonContainer}>
              {Array.from({ length: 12 }).map((_, i) => (
                <PersonCardSkeleton key={i} />
              ))}
            </div>
          ) : deputies.length ? (
            <PaginatedCards
              cards={deputies}
              total={data?.meta?.pagination?.total ?? 0}
              currentPage={page}
              onPageChange={setPage}
              pageSize={ITEMS_PER_PAGE}
            />
          ) : (
            <NotFoundResults message="За вашим запитом депутати не знайдені" />
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default RatingPage;
