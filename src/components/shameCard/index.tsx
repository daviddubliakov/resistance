import { FC } from 'react';
import { ShameCardInfo } from '../../types';
import styles from './shameCard.module.css';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Link } from 'react-router-dom';

const ShameCard: FC<ShameCardInfo> = shameCard => {
  const { deputats } = shameCard;

  if (!deputats || deputats.length === 0) return null;

  const mayor = deputats.find(d => d.placeOfEmployment?.toLowerCase().includes('міський голова'));

  const secretary = deputats.find(d => d.placeOfEmployment?.toLowerCase().includes('секретар'));

  const deputyIndex = shameCard.documentId ? shameCard.documentId.length % deputats.length : 0;

  const priorityDeputy = mayor || secretary || deputats[deputyIndex];

  const imageUrl = priorityDeputy?.photo?.url || '';
  const fullname = `${priorityDeputy?.firstName} ${priorityDeputy?.lastName}`;

  const deputiesCount = deputats.length - 1;

  return (
    <Link to={`/details/${shameCard.documentId}`} className={styles.cardLink}>
      <div className={styles.shameCard}>
        <div className={styles.shameCardHead}>
          {imageUrl && <img src={imageUrl} alt="portret" className={styles.shameCardImage} />}
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
