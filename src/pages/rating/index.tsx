import { useMemo, useState } from 'react';
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

const ITEMS_PER_PAGE = 10;

const RatingPage = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ['deputies', page],
    queryFn: () => getDeputies({ page, pageSize: ITEMS_PER_PAGE }),
  });

  const deputies = useMemo(() => {
    const list = data?.data ?? [];
    if (list.length === 0) return [];

    const mayorIndex = list.findIndex(deputy =>
      deputy.placeOfEmployment.includes('Міський голова')
    );
    if (mayorIndex <= -1) return list;

    const reordered = [...list];
    const [mayor] = reordered.splice(mayorIndex, 1);
    reordered.unshift(mayor);
    return reordered;
  }, [data?.data]);

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
          {isLoading ? (
            <div className={styles.skeletonContainer}>
              {Array.from({ length: 4 }).map((_, i) => (
                <PersonCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <PaginatedCards
              cards={deputies}
              total={data?.meta?.pagination?.total ?? 0}
              currentPage={page}
              onPageChange={setPage}
              pageSize={ITEMS_PER_PAGE}
            />
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default RatingPage;
