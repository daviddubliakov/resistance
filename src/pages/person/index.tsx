import { FC } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import styles from './person.module.css';
import Tape from '../../assets/images/Masking Tape - 38.png';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import PaginatedCards from '../../components/paginatedCards';
import smallCardImage from '../../assets/images/small_card_image_example.png';
import { ShameCardInfo } from '../../types';

const shameCards: ShameCardInfo[] = [
  {
    image: smallCardImage,
    name: 'Максим Шевченко',
    add: '+2',
    date: '22 Бер 2024',
    description: 'Депутат викритий на хабарі: час для справедливості!',
  },
  {
    image: smallCardImage,
    name: 'Максим Шевченко',
    add: '+5',
    date: '09 Бер 2024',
    description:
      'Незаконне збагачення політиків - це злочин проти народу: час покласти край!',
  },
  {
    image: smallCardImage,
    name: 'Максим Шевченко',
    add: '+3',
    date: '03 Бер 2024',
    description: 'Корупція у владних коридорах: потрібні рішучі дії!',
  },
  {
    image: smallCardImage,
    name: 'Олена Петренко',
    add: '+4',
    date: '20 Бер 2024',
    description: "Політик фальсифікував вибори: громадськість має об'єднатися!",
  },
  {
    image: smallCardImage,
    name: 'Олег Сидоренко',
    add: '+3',
    date: '15 Бер 2024',
    description:
      'Корупція у владних коридорах сягнула жахливих масштабів: потрібні рішучі дії!',
  },
];
const repeatedShameCards = Array(100).fill(shameCards).flat();

const PersonPage: FC = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.person}>
          <div className={styles.breadcrumb}>
            <Link to={'/'} className={styles.breadcrumbLinkMain}>
              Головна{' '}
              <Icon
                icon='bxs:chevron-right'
                className={styles.breadcrumbIcon}
              ></Icon>
            </Link>
            <Link to={'/shames'} className={styles.breadcrumbLinkMain}>
              Особи{' '}
              <Icon
                icon='bxs:chevron-right'
                className={styles.breadcrumbIcon}
              ></Icon>
            </Link>
            <p className={styles.breadcrumbLinkCurrent}>Максим Шевченко</p>
          </div>
          <div className={styles.personIntroduction}>
            <div>
              <img src={Tape} className={styles.tape} />
              <div className={styles.personPhoto}></div>
            </div>
            <div className={styles.personInfo}>
              <div className={styles.name}>МАКСИМ ШЕВЧЕНКО</div>
              <div className={styles.characteristics}>
                <div className={styles.option}>
                  <Icon
                    icon='fontisto:checkbox-active'
                    className={styles.breadcrumbIcon}
                  ></Icon>
                  <div className={styles.optionText}>
                    <h4>Обирався / обиралась від:</h4>
                    <p>Партія "Сила народу"</p>
                  </div>
                </div>
                <div className={styles.option}>
                  <Icon
                    icon='fontisto:persons'
                    className={styles.breadcrumbIcon}
                  ></Icon>
                  <div className={styles.optionText}>
                    <h4>Фракція:</h4>
                    <p>ВО "Батьківщина"</p>
                  </div>
                </div>
                <div className={styles.option}>
                  <Icon
                    icon='fontisto:suitcase'
                    className={styles.breadcrumbIcon}
                  ></Icon>
                  <div className={styles.optionText}>
                    <h4>Місце роботи/посада:</h4>
                    <p>КП "Черкаська служба чистоти"</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.latest}>
          <div className={styles.latestHeader}>
            <div className={styles.latestInfo}>
              <p className={styles.latestTitle}>59 ЗАШКВАРІВ</p>
              <p className={styles.latestDescription}>
                Перевірте, в яких черкаських зашкварах засвітився депутат і як
                саме.
              </p>
            </div>
            <div className={styles.latestButtons}>
              <Link to={'/shames'} className={styles.latestButton}>
                ВСІ ЗАШКВАРИ
                <Icon
                  icon='fontisto:arrow-right'
                  className={styles.arrowRight}
                ></Icon>
              </Link>
            </div>
          </div>
          <PaginatedCards cards={repeatedShameCards} />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default PersonPage;
