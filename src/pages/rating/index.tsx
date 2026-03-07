import { useEffect, useMemo, useState, useCallback, useRef } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import styles from './rating.module.css';
import arrowDown from '../../assets/images/arrow_down.png';
import PaginatedCards from '../../components/paginatedCards';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Link, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getDeputies } from '../../services/getDeputies';
import PersonCardSkeleton from '../../components/personCardSkeleton';
import { TextField } from '../../components/text-field';
import { NotFoundResults } from '../../components/not-found-results/not-found-results';

const ITEMS_PER_PAGE = 12;

const RatingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchFromUrl = searchParams.get('search') ?? '';
  const pageFromUrl = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10) || 1);

  const [page, setPage] = useState(pageFromUrl);
  const [search, setSearch] = useState(searchFromUrl);
  const [debouncedSearch, setDebouncedSearch] = useState(searchFromUrl);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setSearch(searchFromUrl);
    setDebouncedSearch(searchFromUrl);
    setPage(pageFromUrl);
  }, [searchFromUrl, pageFromUrl]);

  useEffect(() => {
    const handler = setTimeout(() => {
      const trimmed = search.trim();
      setDebouncedSearch(trimmed);

      const next = new URLSearchParams();
      if (trimmed) next.set('search', trimmed);
      if (page > 1) next.set('page', String(page));
      setSearchParams(next, { replace: true, preventScrollReset: true });
    }, 300);

    return () => clearTimeout(handler);
  }, [search, page, setSearchParams]);

  useEffect(() => {
    const trimmedSearch = search.trim();
    const next = new URLSearchParams();
    if (trimmedSearch) next.set('search', trimmedSearch);
    if (page > 1) next.set('page', String(page));
    setSearchParams(next, { replace: true, preventScrollReset: true });
  }, [page, search, setSearchParams]);

  const onPageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ['deputies', page, debouncedSearch],
    queryFn: () =>
      getDeputies({
        page,
        pageSize: ITEMS_PER_PAGE,
        search: debouncedSearch,
      }),
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

  const onSearchHandler = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

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
        <section ref={containerRef} className="container">
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
              onPageChange={onPageChange}
              pageSize={ITEMS_PER_PAGE}
            />
          ) : (
            <NotFoundResults message="На жаль, ми не можемо знайти такого депутата. Зверніться до нас, якщо вважаєте, що це помилка" />
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default RatingPage;
