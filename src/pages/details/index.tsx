import { FC } from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'
import styles from './details.module.css'
import { Icon } from '@iconify/react/dist/iconify.js'
import { Link } from 'react-router-dom'
import detailedImage from '../../assets/images/detailed_image.png'
import cardImage from '../../assets/images/card_image_example.png'
import partyLogo from '../../assets/images/party_logo_example.png'
import tape from '../../assets/images/tape.png'
import PersonCard from '../../components/personCard'

const ratingCards = [
  {
    image: cardImage,
    count: 59,
    name: 'МАКСИМ ШЕВЧЕНКО',
    party: 'Сила народу',
    logo: partyLogo,
  },
  {
    image: cardImage,
    count: 45,
    name: 'ОЛЕГ СИДОРЕНКО',
    party: 'Партія справедливості',
    logo: partyLogo,
  },
  {
    image: cardImage,
    count: 26,
    name: 'ОЛЕНА ПЕТРЕНКО',
    party: 'Голос України',
    logo: partyLogo,
  },
]

const repeatedRatingCards = Array(20).fill(ratingCards).flat()

const DetailsPage: FC = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.introduction}>
          <div className={styles.breadcrumb}>
            <Link to={'/'} className={styles.breadcrumbLinkMain}>
              Головна <Icon icon="bxs:chevron-right" className={styles.breadcrumbIcon}></Icon>
            </Link>
            <Link to={'/shames'} className={styles.breadcrumbLinkMain}>
              Зашквари <Icon icon="bxs:chevron-right" className={styles.breadcrumbIcon}></Icon>
            </Link>
            <p className={styles.breadcrumbLinkCurrent}>
              Журналістське розслідування викриває давно забуті корупційні схеми в уряді
            </p>
          </div>
          <div className={styles.introductionInfo}>
            <p className={styles.infoDate}>22 БЕР 2024</p>
            <p className={styles.infoHead}>
              Журналістське розслідування викриває давно забуті корупційні схеми в уряді
            </p>
            <p className={styles.infoDescription}>
              Цей випадок є черговим свідченням корупції, яка, на жаль, все ще поширена в Україні.
              Важливо, щоб подібні злочини розслідувалися та каралися, щоб запобігти подібним
              випадкам у майбутньому.
            </p>
          </div>
        </section>
        <section className={styles.description}>
          <p className={styles.descriptionText}>
            Сьогодні правоохоронні органи оголосили про викриття корупційної схеми, до якої був
            залучений чиновник Максим Шевченко.
          </p>
          <p className={styles.descriptionText}>
            <span className={styles.selected}>Згідно з НАБУ</span>, чиновник Максим Шевченко
            використовував своє службове становище для корупційних схем. В результаті його дій
            державі було завдано збитків на суму <br /> 100 000 000 гривень.
          </p>
          <img className={styles.descriptionImage} src={detailedImage} alt="details" />
          <img src={tape} alt="tape" className={styles.tape} />
          <div className={styles.descriptionDetails}>
            <p className={styles.descriptionText}>
              Максим Шевченко був затриманий та йому пред’явлено звинувачення у корупції та
              зловживанні службовим положенням.
            </p>
            <p className={styles.descriptionText}>Важливість розслідування та покарання:</p>
            <ul className={styles.descriptionList}>
              <li className={styles.descriptionText}>
                Цей випадок є свідченням корупції в Україні.
              </li>
              <li className={styles.descriptionText}>
                Важливо, щоб подібні злочини розслідувалися та каралися.
              </li>
              <li className={styles.descriptionText}>
                Це допоможе запобігти подібним випадкам у майбутньому.
              </li>
            </ul>
            <p className={styles.descriptionText}>
              Цей випадок є черговим свідченням корупції, яка, на жаль, все ще поширена в Україні.
              Важливо, щоб подібні злочини розслідувалися та каралися, щоб запобігти подібним
              випадкам у майбутньому.
            </p>
          </div>
        </section>
        <section className={styles.sources}>
          <p className={styles.sourcesHead}>СПИСОК ДЖЕРЕЛ</p>
          <div className={styles.sourcesLinks}>
            <div className={styles.sourcesLink}>
              <p className={styles.sourcesName}>
                Національне антикорупційне бюро України (НАБУ)
                <Icon icon="fontisto:arrow-right" className={styles.linkArrow}></Icon>
              </p>
              <p className={styles.sourcesDescription}>
                Максим Шевченко затриманий за підозрою в корупції!
              </p>
            </div>
            <div className={styles.sourcesLink}>
              <p className={styles.sourcesName}>
                Українська правда
                <Icon icon="fontisto:arrow-right" className={styles.linkArrow}></Icon>
              </p>
              <p className={styles.sourcesDescription}>
                Корупційна схема чиновника розкрита! 100 000 гривень збитків державі: Максим
                Шевченко відповість за свої дії!
              </p>
            </div>
            <div className={styles.sourcesLink}>
              <p className={styles.sourcesName}>
                Львівська газета
                <Icon icon="fontisto:arrow-right" className={styles.linkArrow}></Icon>
              </p>
              <p className={styles.sourcesDescription}>
                Чиновник Максим Шевченко затриманий за підозрою в корупції! Високопосадовець
                викритий у хабарництві!
              </p>
            </div>
            <div className={styles.sourcesLink}>
              <p className={styles.sourcesName}>
                Генеральна прокуратура України
                <Icon icon="fontisto:arrow-right" className={styles.linkArrow}></Icon>
              </p>
              <p className={styles.sourcesDescription}>
                Максим Шевченко - черговий чиновник, спійманий на хабарі.
              </p>
            </div>
          </div>
        </section>
        <div className="container">
          <section className={styles.latest}>
            <div className={styles.latestHeader}>
              <div className={styles.latestInfo}>
                <p className={styles.latestTitle}>СПИСОК ОСІБ</p>
                <p className={styles.latestDescription}>
                  Оновлюваний список осіб, які були залучені до корупції, хабарництва, зловживання
                  владою, некомпетентності та інших неприйнятних дій.
                </p>
              </div>
              <div className={styles.latestButtons}>
                <Link to={'/rating'} className={styles.latestButton}>
                  ВСІ ОСОБИ
                  <Icon icon="fontisto:arrow-right" className={styles.arrowRight}></Icon>
                </Link>
              </div>
            </div>
            <div className={styles.latestCards}>
              {repeatedRatingCards.slice(0, 8).map((latestCard, index) => (
                <PersonCard key={index} {...latestCard} />
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default DetailsPage
