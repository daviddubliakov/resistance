import { FC, useState, useEffect } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import styles from "./rating.module.css";
import arrowDown from "../../assets/images/arrow_down.png";
import PaginatedCards from "../../components/paginatedCards";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import { getDeputies } from "../../services/getDeputies";

const RatingPage: FC = () => {
  const [deputies, setDeputies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await getDeputies();
      if (data) {
        setDeputies(data);
      } else {
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
          <section className="container">
            <div className={styles.breadcrumb}>
              <Link to={"/"} className={styles.breadcrumbLinkMain}>
                Головна{" "}
                <Icon
                  icon="bxs:chevron-right"
                  className={styles.breadcrumbIcon}
                ></Icon>
              </Link>
              <p className={styles.breadcrumbLinkCurrent}>Особи</p>
            </div>
          </section>
          <section className="container">
            <div className={styles.introductionHead}>
              <p className={styles.name}>РЕЙТИНГ ЗАШКВАРІВ</p>
              <div className={styles.whiteLine}></div>
              <p className={styles.goal}>
                Перевірте, хто з депутатів міської ради найбільше засвітився в
                черкаських зашкварах і як саме.
              </p>
              <div className={styles.arrows}>
                <img src={arrowDown} alt="arrow" />
                <img src={arrowDown} alt="arrow" />
                <img src={arrowDown} alt="arrow" />
              </div>
            </div>
          </section>
        </section>
        <section className="container">
          {!loading ? (
            <div className="spinner-border">Завантаження...</div>
          ) : (
            <PaginatedCards cards={deputies} />
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default RatingPage;
