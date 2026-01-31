import { FC } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ShameCard from '../../../components/shameCard';
import ShameSkeleton from '../../../components/shameSkeleton';
import type { ShameCardInfo } from '../../../types';
import { getShames } from '../../../services/getShames';
import styles from './latest.module.css';

const Latest: FC = () => {
  const { data: shames = [], isLoading: shamesLoading } = useQuery<ShameCardInfo[]>({
    queryKey: ['shames'],
    queryFn: getShames,
  });

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
              ? Array.from({ length: 4 }).map((_, index) => (
                  <ShameSkeleton key={`latest-skel-${index}`} />
                ))
              : shames.map((shame, index) => <ShameCard key={index} {...shame} />)}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Latest;
