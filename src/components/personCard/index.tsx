import { FC } from 'react';
import { PersonCardInfo } from '../../types';
import styles from './personCard.module.css';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Link } from 'react-router-dom';
import { getPlural } from '../../utils/utils';

const PersonCard: FC<PersonCardInfo> = personCard => {
  const imageUrl = personCard.photo?.url;
  const partyLogo = personCard.party?.logo?.url;
  return (
    <Link to={`/person/${personCard.documentId}`} className={styles.cardLink}>
      <div className={styles.personCard}>
        <img src={imageUrl} alt="card image" className={styles.personCardImage} />
        <p className={styles.personCardCount}>
          {personCard.shames.length}{' '}
          {getPlural(personCard.shames.length, 'ЗАШКВАР', 'ЗАШКВАРИ', 'ЗАШКВАРІВ')}
        </p>
        <p className={styles.personCardName}>{personCard.firstName + ' ' + personCard.lastName}</p>
        <div className={styles.personCardParty}>
          <img src={partyLogo} alt="party logo" className={styles.partyLogo} />
          <p className={styles.partyName}>{personCard.party?.name || 'Позапартійний'}</p>
        </div>
        <div className={styles.triangle}></div>
        <Icon icon="fontisto:arrow-right" className={styles.arrow}></Icon>
      </div>
    </Link>
  );
};

export default PersonCard;
