import { FC } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { Icon } from '@iconify/react';
import styles from './error404.module.css';

const Error404Page: FC = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className="container">
          <section className={styles.errorSection}>
            <div className={styles.errorContent}>
              <h1 className={styles.errorCode}>404</h1>
              <h2 className={styles.errorTitle}>Сторінку не знайдено</h2>
              <p className={styles.errorDescription}>
                Вибачте, сторінку, яку ви шукаєте, не знайдено. Можливо, вона була переміщена або
                видалена.
              </p>
              <Link to="/" className={styles.homeButton}>
                <Icon icon="bxs:chevron-left" className={styles.buttonIcon} />
                Повернутися на головну
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Error404Page;
