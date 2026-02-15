import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ShameCard from '../../../components/shameCard';
import ShameSkeleton from '../../../components/shameSkeleton';
import { getShames } from '../../../services/getShames';
import styles from './latest.module.css';

const HOMEPAGE_SHAMES_LIMIT = 6;

const Latest = () => {
  const { data, isLoading: shamesLoading } = useQuery({
    queryKey: ['shames', 'home'],
    queryFn: () => getShames({ page: 1, pageSize: HOMEPAGE_SHAMES_LIMIT }),
  });
  const shames = data?.data ?? [];

  return (
    <div className={styles.latest}>
      <div className="container">
        <section className={styles.latestLayout}>
          <div className={styles.latestHeader}>
            <div className={styles.latestInfo}>
              <p className={styles.latestTitle}>ОСТАННІ ЗАШКВАРИ</p>
              <p className={styles.latestDescription}>
                Згадайте, які дії та рішення міської влади зашкодили громаді або викликали осуд та
                гостру негативну реакцію суспільства.
              </p>
            </div>
            <div className={styles.latestButtons}>
              <Link to="/shames" className={styles.latestButton}>
                ВСІ ЗАШКВАРИ
                <Icon icon="fontisto:arrow-right" className={styles.arrowRight}></Icon>
              </Link>
            </div>
          </div>
          <div className={styles.latestCards}>
            {shamesLoading
              ? Array.from({ length: 4 }).map((_, i) => <ShameSkeleton key={`latest-skel-${i}`} />)
              : shames.map((shame, i) => <ShameCard key={i} {...shame} />)}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Latest;
