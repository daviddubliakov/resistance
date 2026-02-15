import { useState } from 'react';
import Pagination from 'rc-pagination';
import { PersonCardInfo, ShameCardInfo } from '../../types';
import PersonCard from '../personCard';
import styles from './paginatedCards.module.css';
import 'rc-pagination/assets/index.css';
import './pagination.css';
import ShameCard from '../shameCard';

const ITEMS_PER_PAGE = 12;

const PaginatedCards = ({
  cards,
  className,
  total: totalProp,
  currentPage: currentPageProp,
  onPageChange,
  pageSize: pageSizeProp,
}: {
  cards: PersonCardInfo[] | ShameCardInfo[];
  className?: string;
  total?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  pageSize?: number;
}) => {
  const [clientPage, setClientPage] = useState<number>(1);

  const isServerSide =
    totalProp !== undefined && currentPageProp !== undefined && onPageChange !== undefined;

  const currentPage = isServerSide ? currentPageProp : clientPage;
  const pageSize = isServerSide ? (pageSizeProp ?? ITEMS_PER_PAGE) : ITEMS_PER_PAGE;
  const total = isServerSide ? totalProp : cards.length;

  const handlePageChange = (page: number) => {
    if (isServerSide) {
      onPageChange(page);
    } else {
      setClientPage(page);
    }
  };

  const currentCards = isServerSide
    ? cards
    : cards.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className={styles.layout}>
      <div className={`${styles.cardContainer} ${className}`}>
        {currentCards.map((card, index) => {
          return 'description' in card ? (
            <ShameCard key={index} {...(card as unknown as ShameCardInfo)} />
          ) : (
            <PersonCard key={index} {...(card as unknown as PersonCardInfo)} />
          );
        })}
      </div>
      <Pagination
        current={currentPage}
        total={total}
        pageSize={pageSize}
        onChange={handlePageChange}
        showTitle={false}
      />
    </div>
  );
};

export default PaginatedCards;
