import { FC } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import styles from './remember.module.css';

const Remember: FC = () => {
  return (
    <div className="container">
      <section className={styles.remember}>
        <div className={styles.rememberInfo}>
          <p className={styles.rememberHead}>ЧЕРКАСИ ПАМ&apos;ЯТАЮТЬ УСЕ</p>
          <p className={styles.rememberText}>
            Цей сайт — &quot;зовнішній носій&quot; пам&apos;яті виборців про діяльність
            представників міської влади та їхню причетність до подій, які викликали суспільний
            резонанс.
          </p>
        </div>
        <div className={styles.rememberLinks}>
          <Link to="/shames" className={styles.rememberLink}>
            <p className={styles.linkText}>ЗАШКВАРИ</p>
            <Icon icon="fontisto:arrow-right" className={styles.linkIcon}></Icon>
          </Link>
          <div className={styles.thinLine} />
          <Link to="/rating" className={styles.rememberLink}>
            <p className={styles.linkText}>ОСОБИ</p>
            <Icon icon="fontisto:arrow-right" className={styles.linkIcon}></Icon>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Remember;
