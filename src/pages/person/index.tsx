import { FC } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import styles from "./person.module.css";
import Tape from "../../assets/images/Masking Tape - 38.png";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import PaginatedCards from "../../components/paginatedCards";
import smallCardImage from "../../assets/images/small_card_image_example.png";
import { ShameCardInfo } from "../../types";
import personPhoto from "../../assets/images/card_image_example.png";

const shameCards: ShameCardInfo[] = [
  {
    image: smallCardImage,
    name: "Максим Шевченко",
    add: "+2",
    date: "22 Бер 2024",
    description: "Депутат викритий на хабарі: час для справедливості!",
  },
  {
    image: smallCardImage,
    name: "Максим Шевченко",
    add: "+5",
    date: "09 Бер 2024",
    description:
      "Незаконне збагачення політиків - це злочин проти народу: час покласти край!",
  },
  {
    image: smallCardImage,
    name: "Максим Шевченко",
    add: "+3",
    date: "03 Бер 2024",
    description: "Корупція у владних коридорах: потрібні рішучі дії!",
  },
  {
    image: smallCardImage,
    name: "Олена Петренко",
    add: "+4",
    date: "20 Бер 2024",
    description: "Політик фальсифікував вибори: громадськість має об'єднатися!",
  },
  {
    image: smallCardImage,
    name: "Олег Сидоренко",
    add: "+3",
    date: "15 Бер 2024",
    description:
      "Корупція у владних коридорах сягнула жахливих масштабів: потрібні рішучі дії!",
  },
];
const repeatedShameCards = Array(100).fill(shameCards).flat();

const PersonPage: FC = () => {
  const person = {
    party: 'Партія "Сила народу"',
    faction: 'ВО "Батьківщина"',
    position: 'КП "Черкаська служба чистоти"',
    isCorruptListed: true,
    businesses: ['ТОВ "Черкаси-Агро"', "ФОП Коваль С.В"],
    extraIncomeSources: [
      "Оренда житлової нерухомості",
      "Дивіденди",
      "Оренда комерційної нерухомості",
      "Роялті",
      "Cпадщина",
    ],
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.person}>
          <section className="container">
            <div className={styles.breadcrumb}>
              <Link to={"/"} className={styles.breadcrumbLinkMain}>
                Головна{" "}
                <Icon
                  icon="bxs:chevron-right"
                  className={styles.breadcrumbIcon}
                ></Icon>
              </Link>
              <Link to={"/shames"} className={styles.breadcrumbLinkMain}>
                Особи{" "}
                <Icon
                  icon="bxs:chevron-right"
                  className={styles.breadcrumbIcon}
                ></Icon>
              </Link>
              <p className={styles.breadcrumbLinkCurrent}>Максим Шевченко</p>
            </div>
            <div className={styles.personIntroduction}>
              <div className={styles.personIntroductionImage}>
                <img src={Tape} className={styles.tape} />
                <img
                  src={personPhoto}
                  alt="Person"
                  className={styles.personPhoto}
                  width={509}
                  height={731}
                />
              </div>
              <div className={styles.personInfo}>
                <div className={styles.name}>МАКСИМ ШЕВЧЕНКО</div>
                <div className={styles.characteristics}>
                  <div className={styles.option}>
                    <Icon
                      icon="fontisto:checkbox-active"
                      className={styles.breadcrumbIcon}
                    ></Icon>
                    <div className={styles.optionText}>
                      <h4>Обирався / обиралась від:</h4>
                      <p>{person.party}</p>
                    </div>
                  </div>
                  <div className={styles.option}>
                    <Icon
                      icon="fontisto:persons"
                      className={styles.breadcrumbIcon}
                    ></Icon>
                    <div className={styles.optionText}>
                      <h4>Фракція:</h4>
                      <p>{person.faction}</p>
                    </div>
                  </div>
                  <div className={styles.option}>
                    <Icon
                      icon="fontisto:suitcase"
                      className={styles.breadcrumbIcon}
                    ></Icon>
                    <div className={styles.optionText}>
                      <h4>Місце роботи/посада:</h4>
                      <p>{person.position}</p>
                    </div>
                  </div>
                  <div className={styles.option}>
                    <Icon
                      icon="fontisto:wallet"
                      className={styles.breadcrumbIcon}
                    />
                    <div className={styles.optionText}>
                      <h4>Чи є у базі корупціонерів:</h4>
                      <p>{person.isCorruptListed ? "Так" : "Ні"}</p>
                    </div>
                  </div>
                  <div className={styles.option}>
                    <Icon
                      icon="mdi:office-building-outline"
                      className={styles.breadcrumbIcon}
                    />
                    <div className={styles.optionText}>
                      <h4>Асоційовані бізнеси:</h4>
                      {person.businesses.length > 0 ? (
                        <ul className={styles.list}>
                          {person.businesses.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className={styles.empty}>Немає даних</p>
                      )}
                    </div>
                  </div>
                  <div className={styles.option}>
                    <Icon
                      icon="mdi:cash-multiple"
                      className={styles.breadcrumbIcon}
                    />
                    <div className={styles.optionText}>
                      <h4>Додаткові джерела доходу:</h4>
                      {person.extraIncomeSources.length > 0 ? (
                        <ul className={styles.list}>
                          {person.extraIncomeSources.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className={styles.empty}>Немає даних</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
        <section className={styles.latestBg}>
          <div className="container">
            <section className={styles.latest}>
              <div className={styles.latestHeader}>
                <div className={styles.latestInfo}>
                  <p className={styles.latestTitle}>59 ЗАШКВАРІВ</p>
                  <p className={styles.latestDescription}>
                    Перевірте, в яких черкаських зашкварах засвітився депутат і
                    як саме.
                  </p>
                </div>
                <div className={styles.latestButtons}>
                  <Link to={"/shames"} className={styles.latestButton}>
                    ВСІ ЗАШКВАРИ
                    <Icon
                      icon="fontisto:arrow-right"
                      className={styles.arrowRight}
                    ></Icon>
                  </Link>
                </div>
              </div>
              <PaginatedCards cards={repeatedShameCards} />
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default PersonPage;
