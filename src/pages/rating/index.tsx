import { FC, useMemo } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import styles from './rating.module.css';
import arrowDown from '../../assets/images/arrow_down.png';
import PaginatedCards from '../../components/paginatedCards';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getDeputies } from '../../services/getDeputies';
import { PersonCardInfo } from '../../types';
import PersonCardSkeleton from '../../components/personCardSkeleton';

const RatingPage: FC = () => {
  const { data: deputiesData = [], isLoading } = useQuery<PersonCardInfo[]>({
    queryKey: ['deputies'],
    queryFn: getDeputies,
  });

  const deputies = useMemo(() => {
    return [...deputiesData].sort((a, b) => {
      const targetName = 'Бондаренко';

      if (a.lastName === targetName && b.lastName !== targetName) return -1;
      if (b.lastName === targetName && a.lastName !== targetName) return 1;

      const lastNameCompare = a.lastName.localeCompare(b.lastName, 'uk');

      if (lastNameCompare === 0) {
        return a.firstName.localeCompare(b.firstName, 'uk');
      }

      return lastNameCompare;
    });
  }, [deputiesData]);

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
              {Array.from({ length: 12 }).map((_, i) => (
                <PersonCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <PaginatedCards cards={deputies} />
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default RatingPage;
