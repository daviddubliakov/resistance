import styles from "./shameSkeleton.module.css";

const ShameSkeleton = () => {
  return (
    <div className={`${styles.shameCardSkeleton} ${styles.animatePulse}`}>
      <div className={styles.skeletonHead}>
        <div
          className={`${styles.skeletonItem} ${styles.skeletonAvatar}`}
        ></div>
        <div className={`${styles.skeletonItem} ${styles.skeletonName}`}></div>
      </div>

      <div className={styles.skeletonInfo}>
        <div className={`${styles.skeletonItem} ${styles.skeletonDate}`}></div>

        <div
          style={{ width: "100%" }}
          className={`${styles.skeletonItem} ${styles.skeletonLine}`}
        ></div>
        <div
          style={{ width: "90%" }}
          className={`${styles.skeletonItem} ${styles.skeletonLine}`}
        ></div>
        <div
          style={{ width: "80%" }}
          className={`${styles.skeletonItem} ${styles.skeletonLine}`}
        ></div>
        <div
          style={{ width: "70%" }}
          className={`${styles.skeletonItem} ${styles.skeletonLine}`}
        ></div>
      </div>
    </div>
  );
};

export default ShameSkeleton;
