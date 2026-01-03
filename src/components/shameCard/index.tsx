import { FC } from "react";
import { ShameCardInfo } from "../../types";
import styles from "./shameCard.module.css";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

const ShameCard: FC<ShameCardInfo> = (shameCard) => {
  const imageUrl =
    shameCard.deputats[0].photo?.formats?.small?.url ||
    shameCard.deputats[0].photo?.formats?.thumbnail?.url;
  const fullname =
    shameCard.deputats[0].firstName + " " + shameCard.deputats[0].lastName;

  return (
    <Link to={"/details"} className={styles.cardLink}>
      <div className={styles.shameCard}>
        <div className={styles.shameCardHead}>
          <img
            src={`${import.meta.env.VITE_STRAPI_URL}${imageUrl}`}
            alt="portret"
            className={styles.shameCardImage}
          />
          <div>
            <p className={styles.shameCardName}>{fullname}</p>
          </div>
          <p className={styles.shameCardAdd}>+ {shameCard.deputats.length}</p>
        </div>
        <div className={styles.shameCardInfo}>
          <p className={styles.shameCardDate}>{shameCard.date}</p>
          <p className={styles.shameCardDescription}>{shameCard.description}</p>
        </div>
        <div className={styles.triangle}></div>
        <Icon icon="fontisto:arrow-right" className={styles.arrow}></Icon>
      </div>
    </Link>
  );
};

export default ShameCard;
