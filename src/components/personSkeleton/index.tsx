import styles from './personSkeleton.module.css';

const PersonSkeleton = () => {
  return (
    <div className={`${styles.introSkeleton} ${styles.animatePulse}`}>
      <div className={`${styles.skeletonItem} ${styles.imageSkeletonWrapper}`}></div>

      <div className={styles.infoSkeleton}>
        <div className={`${styles.skeletonItem} ${styles.nameSkeleton}`}></div>

        <div className={styles.characteristicsSkeleton}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={styles.optionSkeleton}>
              <div className={`${styles.skeletonItem} ${styles.iconSkeleton}`}></div>

              <div className={styles.textGroup}>
                <div className={`${styles.skeletonItem} ${styles.labelSkeleton}`}></div>
                <div className={`${styles.skeletonItem} ${styles.valueSkeleton}`}></div>
              </div>
            </div>
          ))}
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className={styles.optionSkeleton}>
              <div className={`${styles.skeletonItem} ${styles.iconSkeleton}`}></div>

              <div className={styles.textGroup}>
                <div className={`${styles.skeletonItem} ${styles.labelSkeleton}`}></div>
                <div className={`${styles.skeletonItem} ${styles.listItemSkeleton}`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonSkeleton;
