import { FC, useCallback, useEffect, useState } from "react";
import Header from "../../components/header";
import arrowDown from "../../assets/images/arrow_down.png";
import styles from "./home.module.css";
import Footer from "../../components/footer";
import { Icon } from "@iconify/react";
import PersonCard from "../../components/personCard";
import { PersonCardInfo, ShameCardInfo } from "../../types";
import ShameCard from "../../components/shameCard";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import { getDeputies } from "../../services/getDeputies";
import { getShames } from "../../services/getShames";

const HomePage: FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [progress, setProgress] = useState(0);
  const [deputies, setDeputies] = useState<PersonCardInfo[]>([]);
  const [shames, setShames] = useState<ShameCardInfo[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const ratingLineStyle = {
    "--progress": `${progress * 100}%`,
  } as React.CSSProperties;

  useEffect(() => {
    const loadData = async () => {
      const data = await getDeputies();
      if (data) {
        setDeputies(data);
      }
    };
    loadData();
  }, []);
  useEffect(() => {
    const loadData = async () => {
      const data = await getShames();
      if (data) {
        setShames(data);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    const onScroll = () => {
      setProgress(emblaApi.scrollProgress());
    };

    emblaApi.on("scroll", onScroll);
    emblaApi.on("resize", onScroll);
    onScroll();

    return () => {
      emblaApi.off("scroll", onScroll);
      emblaApi.off("resize", onScroll);
    };
  }, [emblaApi]);

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
              Проєкт створений, щоб фіксувати шкідливі або суперечливі рішення
              міської влади, виявляти їхню причетність до черкаських зашкварів і
              дати можливість жителям громади відстежувати доброчесність кожного
              депутата Черкаської міської ради і не тільки.
            </p>
            <div className={styles.arrows}>
              <img src={arrowDown} alt="arrow" />
              <img src={arrowDown} alt="arrow" />
              <img src={arrowDown} alt="arrow" />
            </div>
          </section>
        </div>
        <div className={styles.ratingBg}>
          <div className="container">
            <section className={styles.rating}>
              <div className={styles.ratingHeader}>
                <div className={styles.ratingInfo}>
                  <p className={styles.ratingTitle}>
                    РЕЙТИНГ УЧАСТІ У ЗАШКВАРАХ
                  </p>
                  <p className={styles.ratingDescription}>
                    Перевірте, хто з представників міської влади найбільше
                    засвітився в черкаських зашкварах і як саме.
                  </p>
                </div>
                <div className={styles.ratingButtons}>
                  <Link to="/rating" className={styles.ratingButton}>
                    РЕЙТИНГ ЗАШКВАРІВ
                    <Icon
                      icon="fontisto:arrow-right"
                      className={styles.arrowRight}
                    ></Icon>
                  </Link>
                </div>
              </div>
              <div className={styles.embla} ref={emblaRef}>
                <div className={styles.emblaContainer}>
                  {deputies.map((deputy, index) => (
                    <div className={styles.emblaSlide} key={index}>
                      <PersonCard {...deputy} />
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.ratingLine} style={ratingLineStyle} />{" "}
              <div className={styles.slider}>
                <button className={styles.sliderButton} onClick={scrollPrev}>
                  <Icon icon="bxs:chevron-left" className={styles.sliderIcon} />
                </button>
                <button className={styles.sliderButton} onClick={scrollNext}>
                  <Icon
                    icon="bxs:chevron-right"
                    className={styles.sliderIcon}
                  />
                </button>
              </div>
            </section>
          </div>
        </div>
        <div className="container">
          <section className={styles.remember}>
            <div className={styles.rememberInfo}>
              <p className={styles.rememberHead}>ЧЕРКАСИ ПАМ'ЯТАЮТЬ УСЕ</p>
              <p className={styles.rememberText}>
                Цей сайт — "зовнішній носій" пам'яті виборців про діяльність
                представників міської влади та їхню причетність до подій, які
                викликали суспільний резонанс.
              </p>
            </div>
            <div className={styles.rememberLinks}>
              <Link to="/shames" className={styles.rememberLink}>
                <p className={styles.linkText}>ЗАШКВАРИ</p>
                <Icon
                  icon="fontisto:arrow-right"
                  className={styles.linkIcon}
                ></Icon>
              </Link>
              <div className={styles.thinLine} />
              <Link to="/rating" className={styles.rememberLink}>
                <p className={styles.linkText}>ОСОБИ</p>
                <Icon
                  icon="fontisto:arrow-right"
                  className={styles.linkIcon}
                ></Icon>
              </Link>
            </div>
          </section>
        </div>
        <div className={styles.latest}>
          <div className="container">
            <section className={styles.latestLayout}>
              <div className={styles.latestHeader}>
                <div className={styles.latestInfo}>
                  <p className={styles.latestTitle}>ОСТАННІ ЗАШКВАРИ</p>
                  <p className={styles.latestDescription}>
                    Згадайте, які дії та рішення міської влади зашкодили громаді
                    або викликали осуд та гостру негативну реакцію суспільства.
                  </p>
                </div>
                <div className={styles.latestButtons}>
                  <Link to="/shames" className={styles.latestButton}>
                    ВСІ ЗАШКВАРИ
                    <Icon
                      icon="fontisto:arrow-right"
                      className={styles.arrowRight}
                    ></Icon>
                  </Link>
                </div>
              </div>
              <div className={styles.latestCards}>
                {shames.map((shame, index) => (
                  <ShameCard key={index} {...shame} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
