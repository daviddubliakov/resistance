import { useEffect, useState, useCallback, useRef } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import arrowDown from '../../assets/images/arrow_down.png';
import styles from './latest.module.css';
import PaginatedCards from '../../components/paginatedCards';
import { Link, useSearchParams } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useQuery } from '@tanstack/react-query';
import { getShames } from '../../services/getShames';
import ShameSkeleton from '../../components/shameSkeleton';
import { NotFoundResults } from '../../components/not-found-results/not-found-results';
import { TextField } from '../../components/text-field';

const ITEMS_PER_PAGE = 8;

const LatestPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchFromUrl = searchParams.get('search') ?? '';
  const pageFromUrl = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10) || 1);

  const [page, setPage] = useState(pageFromUrl);
  const [search, setSearch] = useState(searchFromUrl);
  const [debouncedSearch, setDebouncedSearch] = useState(searchFromUrl);
  const searchSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSearch(searchFromUrl);
    setDebouncedSearch(searchFromUrl);
    setPage(pageFromUrl);
  }, [searchFromUrl, pageFromUrl]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 300);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    const next = new URLSearchParams();
    if (debouncedSearch) next.set('search', debouncedSearch);
    if (page > 1) next.set('page', String(page));
    setSearchParams(next, { replace: true, preventScrollReset: true });
  }, [debouncedSearch, page, setSearchParams]);

  const { data, isLoading } = useQuery({
    queryKey: ['shames', page, debouncedSearch],
    queryFn: ({ signal }) =>
      getShames({
        page,
        pageSize: ITEMS_PER_PAGE,
        search: debouncedSearch,
        signal,
      }),
  });

  const onSearchHandler = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

  const onPageChange = useCallback((newPage: number) => {
    setPage(newPage);
    searchSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.introduction}>
          <div className="container">
            <div className={styles.breadcrumb}>
              <Link to="/" className={styles.breadcrumbLinkMain}>
                Головна <Icon icon="bxs:chevron-right" className={styles.breadcrumbIcon} />
              </Link>
              <p className={styles.breadcrumbLinkCurrent}>Зашквари</p>
            </div>
            <div className={styles.pageHead}>
              <div className={styles.pageName}>
                <p className={styles.name}>ОСТАННІ ЗАШКВАРИ</p>
              </div>
              <div className={styles.whiteLine}></div>
              <p className={styles.goal}>
                Згадайте, які дії та рішення міської влади зашкодили громаді або викликали осуд та
                гостру негативну реакцію суспільства.
              </p>
              <div className={styles.arrows}>
                <img src={arrowDown} alt="arrow" />
                <img src={arrowDown} alt="arrow" />
                <img src={arrowDown} alt="arrow" />
              </div>
            </div>
          </div>
        </section>
        <div ref={searchSectionRef} className="container">
          <div className={styles.searchInput}>
            <TextField placeholder="Пошук зашквару" onChange={onSearchHandler} value={search} />
          </div>
          {isLoading ? (
            <div className={styles.skeletonContainer}>
              {Array.from({ length: 4 }).map((_, index) => (
                <ShameSkeleton key={index} />
              ))}
            </div>
          ) : data?.data?.length ? (
            <PaginatedCards
              cards={data?.data ?? []}
              total={data?.meta?.pagination?.total ?? 0}
              currentPage={page}
              onPageChange={onPageChange}
              pageSize={ITEMS_PER_PAGE}
              className={styles.shameCardsRewrite}
            />
          ) : (
            <NotFoundResults message="На жаль, ми не можемо знайти такого зашквару. Зверніться до нас, якщо вважаєте, що це помилка" />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default LatestPage;
