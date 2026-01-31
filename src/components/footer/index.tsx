import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './footer.module.css';

const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <section className="container">
        <div className={styles.layout}>
          <div className={styles.links}>
            <div className={styles.navLinks}>
              <p className={styles.name}>Черкаське досьє</p>
              <div className={styles.navLinksItems}>
                <div className={styles.navRow}>
                  <Link to="/shames" className={styles.link}>
                    Зашквари
                  </Link>
                  <Link to="/rating" className={styles.link}>
                    Особи
                  </Link>
                  <Link to="/about-us" className={styles.link}>
                    Про проєкт
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.info}>
            <p className={styles.infoRow}>
              зроблено Цифровим Черкасами, {new Date().getFullYear()}
            </p>
            <p className={styles.infoRow}>Всі права захищені</p>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
