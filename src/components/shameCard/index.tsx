import { FC } from 'react';
import { ShameCardInfo } from '../../types';
import styles from './shameCard.module.css';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Link } from 'react-router-dom';

const ShameCard: FC<ShameCardInfo> = shameCard => {
  const imageUrl = shameCard.deputats[0]?.photo?.url || shameCard.deputats[0]?.photo?.url;
  const fullname = shameCard.deputats[0].firstName + ' ' + shameCard.deputats[0].lastName;

  const deputiesCount = shameCard.deputats.length - 1;

  return (
    <Link to={`/details/${shameCard.documentId}`} className={styles.cardLink}>
      <div className={styles.shameCard}>
        <div className={styles.shameCardHead}>
          <img src={imageUrl} alt="portret" className={styles.shameCardImage} />
          <div>
            <p className={styles.shameCardName}>{fullname}</p>
          </div>
          {deputiesCount > 0 && <p className={styles.shameCardAdd}>+ {deputiesCount}</p>}
        </div>
        <div className={styles.shameCardInfo}>
          <p className={styles.shameCardDate}>
            {new Date(shameCard.date).toLocaleDateString('uk-UA')}
          </p>
          <p className={styles.shameCardDescription}>{shameCard.title}</p>
        </div>
        <div className={styles.triangle}></div>
        <Icon icon="fontisto:arrow-right" className={styles.arrow}></Icon>
      </div>
    </Link>
  );
};

export default ShameCard;
