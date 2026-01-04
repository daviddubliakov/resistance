import { FC } from "react";
import { PersonCardInfo } from "../../types";
import styles from "./personCard.module.css";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import partyLogo from "../../assets/images/party_logo_example.png";

const PersonCard: FC<PersonCardInfo> = (personCard) => {
  const imageUrl =
    personCard.photo?.formats?.small?.url ||
    personCard.photo?.formats?.thumbnail?.url;
  return (
    <Link to={`/person/${personCard.documentId}`} className={styles.cardLink}>
      <div className={styles.personCard}>
        <img
          src={`${import.meta.env.VITE_STRAPI_URL}${imageUrl}`}
          alt="card image"
          className={styles.personCardImage}
        />
        <p className={styles.personCardCount}>
          {personCard.shames.length}
          {personCard.shames.length > 4 ? " ЗАШКВАРІВ" : " ЗАШКВАРА"}
        </p>
        <p className={styles.personCardName}>
          {personCard.firstName + " " + personCard.lastName}
        </p>
        <div className={styles.personCardParty}>
          <img src={partyLogo} alt="party logo" className={styles.partyLogo} />
          <p className={styles.partyName}>
            {personCard.party || "Позапартійний"}
          </p>
        </div>
        <div className={styles.triangle}></div>
        <Icon icon="fontisto:arrow-right" className={styles.arrow}></Icon>
      </div>
    </Link>
  );
};

export default PersonCard;
