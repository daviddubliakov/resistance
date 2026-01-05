import styles from "./personCardSkeleton.module.css";

const PersonCardSkeleton = () => {
  return (
    <div className={`${styles.personSkeleton} ${styles.animatePulse}`}>
      <div className={`${styles.skeletonItem} ${styles.skeletonImage}`}></div>

      <div className={`${styles.skeletonItem} ${styles.skeletonCount}`}></div>

      <div className={`${styles.skeletonItem} ${styles.skeletonName}`}></div>
      <div className={`${styles.skeletonItem} ${styles.skeletonName}`}></div>

      <div className={styles.skeletonParty}>
        <div
          className={`${styles.skeletonItem} ${styles.skeletonPartyLogo}`}
        ></div>
        <div
          className={`${styles.skeletonItem} ${styles.skeletonPartyName}`}
        ></div>
      </div>
    </div>
  );
};

export default PersonCardSkeleton;
