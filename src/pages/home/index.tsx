import type { FC } from 'react';
import Header from '../../components/header';
import styles from './home.module.css';
import Footer from '../../components/footer';
import Introduction from '../../components/homePage/introduction';
import Rating from '../../components/homePage/rating';
import Remember from '../../components/homePage/remember';
import Latest from '../../components/homePage/latest';

const HomePage: FC = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Introduction />
        <Rating />
        <Remember />
        <Latest />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
