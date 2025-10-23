import { FC, useCallback, useEffect, useState } from 'react'
import Header from '../../components/header'
import arrowDown from '../../assets/images/arrow_down.png'
import styles from './home.module.css'
import cardImage from '../../assets/images/card_image_example.png'
import partyLogo from '../../assets/images/party_logo_example.png'
import smallCardImage from '../../assets/images/small_card_image_example.png'
import Footer from '../../components/footer'
import { Icon } from '@iconify/react'
import PersonCard from '../../components/personCard'
import { PersonCardInfo, ShameCardInfo } from '../../types'
import ShameCard from '../../components/shameCard'
import { Link } from 'react-router-dom'
import useEmblaCarousel from 'embla-carousel-react'

const ratingCards: PersonCardInfo[] = [
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

const latestCards: ShameCardInfo[] = [
  {
    image: smallCardImage,
    name: 'МАКСИМ ШЕВЧЕНКО',
    add: '+2',
    date: '22 БЕР 2024',
    description: 'Депутат викритий на хабарі: час для справедливості!',
  },
  {
    image: smallCardImage,
    name: 'ОЛЕНА ПЕТРЕНКО',
    add: '+4',
    date: '20 БЕР 2024',
    description: "Політик фальсифікував вибори: громадськість має об'єднатися!",
  },
  {
    image: smallCardImage,
    name: 'ОЛЕГ СИДОРЕНКО',
    add: '+3',
    date: '15 БЕР 2024',
    description: 'Корупція у владних коридорах сягнула жахливих масштабів: потрібні рішучі дії!',
  },
  {
    image: smallCardImage,
    name: 'МАКСИМ ШЕВЧЕНКО',
    add: '+5',
    date: '09 БЕР 2024',
    description: 'Незаконне збагачення політиків - це злочин проти народу: час покласти край!',
  },
  {
    image: smallCardImage,
    name: 'МАКСИМ ШЕВЧЕНКО',
    add: '+3',
    date: '03 БЕР 2024',
    description: 'Корупція у владних коридорах: потрібні рішучі дії!',
  },
  {
    image: smallCardImage,
    name: 'МАКСИМ ШЕВЧЕНКО',
    add: '',
    date: '01 БЕР 2024',
    description: 'Міністр зловживав владою: не можна залишати безкарним!',
  },
]

const HomePage: FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [progress, setProgress] = useState(0)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const ratingLineStyle = {
    '--progress': `${progress * 100}%`,
  } as React.CSSProperties

  useEffect(() => {
    if (!emblaApi) return

    const onScroll = () => {
      setProgress(emblaApi.scrollProgress())
    }

    emblaApi.on('scroll', onScroll)
    emblaApi.on('resize', onScroll)
    onScroll()

    return () => {
      emblaApi.off('scroll', onScroll)
      emblaApi.off('resize', onScroll)
    }
  }, [emblaApi])

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className="container">
          <section className={styles.introduction}>
            <div className={styles.sitename}>
              <p className={styles.site}>ЧЕРКАСЬКЕ</p>
              <p className={styles.name}>ДОСЬЄ</p>
            </div>
            <div className={styles.whiteLine}></div>
            <p className={styles.goal}>
              Проєкт створений для того, щоб дати можливість жителям Черкас стежити за діяльністю
              депутатів Черкаської міської ради і виявляти їхню причетність до черкаських зашкварів.
            </p>
            <div className={styles.arrows}>
              <img src={arrowDown} alt="arrow" />
              <img src={arrowDown} alt="arrow" />
              <img src={arrowDown} alt="arrow" />
            </div>
          </section>
        </div>
        <section className={styles.rating}>
          <div className={styles.ratingHeader}>
            <div className={styles.ratingInfo}>
              <p className={styles.ratingTitle}>РЕЙТИНГ ЗАШКВАРІВ</p>
              <p className={styles.ratingDescription}>
                Перевірте, хто з депутатів міської ради найбільше засвітився в черкаських зашкварах
                і як саме
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
              {ratingCards.map((ratingCard, index) => (
                <div className={styles.emblaSlide} key={index}>
                  <PersonCard {...ratingCard} />
                </div>
              ))}
            </div>
          </div>
          <div className={styles.ratingLine} style={ratingLineStyle} />{' '}
          <div className={styles.slider}>
            <button className={styles.sliderButton} onClick={scrollPrev}>
              <Icon icon="bxs:chevron-left" className={styles.sliderIcon} />
            </button>
            <button className={styles.sliderButton} onClick={scrollNext}>
              <Icon icon="bxs:chevron-right" className={styles.sliderIcon} />
            </button>
          </div>
        </section>
        <section className={styles.remember}>
          <div className={styles.rememberInfo}>
            <p className={styles.rememberHead}>ЧЕРКАСИ ПАМ'ЯТАЮТЬ УСЕ</p>
            <p className={styles.rememberText}>
              Цей сайт - "зовнішній носій" пам'яті виборців про діяльність депутатів Черкаської
              міської ради і причетність їх до ситуацій, які викликали великий суспільний резонанс.
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
        <section className={styles.latest}>
          <div className={styles.latestHeader}>
            <div className={styles.latestInfo}>
              <p className={styles.latestTitle}>ОСТАННІ ЗАШКВАРИ</p>
              <p className={styles.latestDescription}>
                Згадайте, які ситуації з життя черкаської громади викликали значний інтерес з боку
                жителів, здобули широкого публічного розголосу, а дії та рішення міської влади по
                ним викликали осуд та гостру негативну реакцію суспільства.
              </p>
            </div>
            <div className={styles.latestButtons}>
              <Link to="/shames" className={styles.latestButton}>
                ВСІ ЗАШКВАРИ
                <Icon icon="fontisto:arrow-right" className={styles.arrowRight}></Icon>
              </Link>
            </div>
          </div>
          <div className={styles.latestCards}>
            {latestCards.map((latestCard, index) => (
              <ShameCard key={index} {...latestCard} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default HomePage
