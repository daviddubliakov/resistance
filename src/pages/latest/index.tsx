import { FC, useEffect, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import arrowDown from "../../assets/images/arrow_down.png";
import styles from "./latest.module.css";
import PaginatedCards from "../../components/paginatedCards";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getShames } from "../../services/getShames";
import { ShameCardInfo } from "../../types";

const LatestPage: FC = () => {
  const [shames, setshames] = useState<ShameCardInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await getShames();

        if (data) {
          const sortedData = [...data].sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();

            return dateB - dateA;
          });

          setshames(sortedData);
        }
      } catch (error) {
        console.error("Помилка при завантаженні зашкварів:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.introduction}>
          <div className="container">
            <div className={styles.breadcrumb}>
              <Link to={"/"} className={styles.breadcrumbLinkMain}>
                Головна{" "}
                <Icon
                  icon="bxs:chevron-right"
                  className={styles.breadcrumbIcon}
                ></Icon>
              </Link>
              <p className={styles.breadcrumbLinkCurrent}>Зашквари</p>
            </div>
            <div className={styles.pageHead}>
              <div className={styles.pageName}>
                <p className={styles.name}>ОСТАННІ ЗАШКВАРИ</p>
              </div>
              <div className={styles.whiteLine}></div>
              <p className={styles.goal}>
                Згадайте, які дії та рішення міської влади зашкодили громаді або
                викликали осуд та гостру негативну реакцію суспільства.
              </p>
              <div className={styles.arrows}>
                <img src={arrowDown} alt="arrow" />
                <img src={arrowDown} alt="arrow" />
                <img src={arrowDown} alt="arrow" />
              </div>
            </div>
          </div>
        </section>
        <div className="container">
          <section className={styles.shameCards}>
            {loading ? (
              <div className="spinner-border">Завантаження...</div>
            ) : (
              <PaginatedCards
                cards={shames}
                className={styles.shameCardsRewrite}
              />
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default LatestPage;
