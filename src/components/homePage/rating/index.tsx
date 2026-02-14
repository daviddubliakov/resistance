import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import PersonCard from '../../../components/personCard';
import PersonCardSkeleton from '../../../components/personCardSkeleton';
import { PersonCardInfo } from '../../../types';
import { getDeputies } from '../../../services/getDeputies';
import { useEmblaCarouselWithProgress } from '../../../hooks/useEmblaCarouselWithProgress';
import styles from './rating.module.css';

const HOMEPAGE_DEPUTIES_LIMIT = 50;

const Rating = () => {
  const { data, isLoading: deputiesLoading } = useQuery({
    queryKey: ['deputies', 'home'],
    queryFn: () => getDeputies({ page: 1, pageSize: HOMEPAGE_DEPUTIES_LIMIT }),
  });
  const deputies: PersonCardInfo[] = data?.data ?? [];

  const { emblaRef, scrollPrev, scrollNext, progressStyle } = useEmblaCarouselWithProgress({
    loop: true,
    align: 'start',
  });

  return (
    <div className={styles.ratingBg}>
      <div className="container">
        <section className={styles.rating}>
          <div className={styles.ratingHeader}>
            <div className={styles.ratingInfo}>
              <p className={styles.ratingTitle}>РЕЙТИНГ УЧАСТІ У ЗАШКВАРАХ</p>
              <p className={styles.ratingDescription}>
                Перевірте, хто з представників міської влади найбільше засвітився в черкаських
                зашкварах і як саме.
              </p>
            </div>
            <div className={styles.ratingButtons}>
              <Link to="/rating" className={styles.ratingButton}>
                РЕЙТИНГ ЗАШКВАРІВ
                <Icon icon="fontisto:arrow-right" className={styles.arrowRight}></Icon>
              </Link>
            </div>
          </div>
          <div className={styles.embla} ref={emblaRef}>
            <div className={styles.emblaContainer}>
              {deputiesLoading
                ? Array.from({ length: 5 }).map((_, index) => (
                    <div className={styles.emblaSlide} key={`skeleton-${index}`}>
                      <PersonCardSkeleton />
                    </div>
                  ))
                : deputies.map((deputy, index) => (
                    <div className={styles.emblaSlide} key={deputy.documentId || index}>
                      <PersonCard {...deputy} />
                    </div>
                  ))}
            </div>
          </div>
          <div className={styles.ratingLine} style={progressStyle} />
          <div className={styles.slider}>
            <button className={styles.sliderButton} onClick={scrollPrev}>
              <Icon icon="bxs:chevron-left" className={styles.sliderIcon} />
            </button>
            <button className={styles.sliderButton} onClick={scrollNext}>
              <Icon icon="bxs:chevron-right" className={styles.sliderIcon} />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Rating;
