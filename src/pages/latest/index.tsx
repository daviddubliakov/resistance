import { FC, useState } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import arrowDown from '../../assets/images/arrow_down.png';
import styles from './latest.module.css';
import PaginatedCards from '../../components/paginatedCards';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useQuery } from '@tanstack/react-query';
import { getShames } from '../../services/getShames';
import ShameSkeleton from '../../components/shameSkeleton';

const ITEMS_PER_PAGE = 8;

const LatestPage: FC = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ['shames', page],
    queryFn: () => getShames({ page, pageSize: ITEMS_PER_PAGE }),
  });

  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.introduction}>
          <div className="container">
            <div className={styles.breadcrumb}>
              <Link to={'/'} className={styles.breadcrumbLinkMain}>
                Головна <Icon icon="bxs:chevron-right" className={styles.breadcrumbIcon}></Icon>
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
        <div className="container">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, index) => <ShameSkeleton key={index} />)
          ) : (
            <PaginatedCards
              cards={data?.data ?? []}
              total={data?.meta?.pagination?.total ?? 0}
              currentPage={page}
              onPageChange={setPage}
              pageSize={ITEMS_PER_PAGE}
              className={styles.shameCardsRewrite}
            />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default LatestPage;
