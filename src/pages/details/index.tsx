import { FC, useEffect, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import styles from "./details.module.css";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, useParams } from "react-router-dom";
import detailedImage from "../../assets/images/detailed_image.png";
import tape from "../../assets/images/tape.png";
import PersonCard from "../../components/personCard";
import { ShameCardInfo } from "../../types";
import { getOneShame } from "../../services/getOneShame";

const DetailsPage: FC = () => {
  const [shame, setShame] = useState<ShameCardInfo | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const loadData = async () => {
      const data = await getOneShame(id);
      if (data) {
        setShame(data);
      }
    };
    loadData();
  }, [id]);
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.introduction}>
          <div className={styles.breadcrumb}>
            <Link to={"/"} className={styles.breadcrumbLinkMain}>
              Головна{" "}
              <Icon
                icon="bxs:chevron-right"
                className={styles.breadcrumbIcon}
              ></Icon>
            </Link>
            <Link to={"/shames"} className={styles.breadcrumbLinkMain}>
              Зашквари{" "}
              <Icon
                icon="bxs:chevron-right"
                className={styles.breadcrumbIcon}
              ></Icon>
            </Link>
            <p className={styles.breadcrumbLinkCurrent}>{shame?.title}</p>
          </div>
          <div className={styles.introductionInfo}>
            <p className={styles.infoDate}>{shame?.date}</p>
            <p className={styles.infoHead}>{shame?.title}</p>
            <p className={styles.infoDescription}>{shame?.description}</p>
          </div>
        </section>
        <section className={styles.description}>
          {shame?.details?.slice(0, 1).map((paragraph: any, index: number) => (
            <p key={index} className={styles.descriptionText}>
              {paragraph.children?.[0]?.text}
            </p>
          ))}
          <img
            className={styles.descriptionImage}
            src={detailedImage}
            alt="details"
          />
          <img src={tape} alt="tape" className={styles.tape} />
          <div className={styles.descriptionDetails}>
            {shame?.details
              ?.slice(2, 5)
              .map((paragraph: any, index: number) => (
                <p key={index} className={styles.descriptionText}>
                  {paragraph.children?.[0]?.text}
                </p>
              ))}

            {/* <ul className={styles.descriptionList}>
              <li className={styles.descriptionText}>
                Цей випадок є свідченням корупції в Україні.
              </li>
              <li className={styles.descriptionText}>
                Важливо, щоб подібні злочини розслідувалися та каралися.
              </li>
              <li className={styles.descriptionText}>
                Це допоможе запобігти подібним випадкам у майбутньому.
              </li>
            </ul> */}
          </div>
        </section>
        <section className={styles.sources}>
          <p className={styles.sourcesHead}>СПИСОК ДЖЕРЕЛ</p>
          <div className={styles.sourcesLinks}>
            {shame?.resources?.map((resource) => (
              <div className={styles.sourcesLink} key={resource.id}>
                <a
                  className={styles.sourcesName}
                  href={resource.url}
                  target="_blank"
                >
                  {resource.subtitle}
                  <Icon
                    icon="fontisto:arrow-right"
                    className={styles.linkArrow}
                  ></Icon>
                </a>
                <p className={styles.sourcesDescription}>{resource.title}</p>
              </div>
            ))}
          </div>
        </section>
        <div className="container">
          <section className={styles.latest}>
            <div className={styles.latestHeader}>
              <div className={styles.latestInfo}>
                <p className={styles.latestTitle}>СПИСОК ОСІБ</p>
                <p className={styles.latestDescription}>
                  Оновлюваний список осіб, які були залучені до корупції,
                  хабарництва, зловживання владою, некомпетентності та інших
                  неприйнятних дій.
                </p>
              </div>
              <div className={styles.latestButtons}>
                <Link to={"/rating"} className={styles.latestButton}>
                  ВСІ ОСОБИ
                  <Icon
                    icon="fontisto:arrow-right"
                    className={styles.arrowRight}
                  ></Icon>
                </Link>
              </div>
            </div>
            <div className={styles.latestCards}>
              {shame?.deputats && shame.deputats.length > 0 ? (
                shame.deputats.map((deputat, index) => (
                  <PersonCard key={index} {...deputat} />
                ))
              ) : (
                <p className={styles.noData}>
                  Пов'язаних депутатів не знайдено
                </p>
              )}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default DetailsPage;
