import { FC } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import styles from './person.module.css';
import Tape from '../../assets/images/Masking Tape - 38.png';
import { Icon } from '@iconify/react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { PersonCardInfo } from '../../types';
import { getOneDeputy } from '../../services/getOneDeputy';
import PaginatedCards from '../../components/paginatedCards';
import PersonSkeleton from '../../components/personSkeleton';

const PersonPage: FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: deputy, isLoading } = useQuery<PersonCardInfo | null>({
    queryKey: ['deputy', id],
    queryFn: () => getOneDeputy(id),
    enabled: !!id,
  });

  const imageUrl = deputy?.photo?.url;
  const fullname = deputy ? deputy.firstName + ' ' + deputy.lastName : '';

  if (!deputy && !isLoading) return <div>Депутата не знайдено</div>;

  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.person}>
          <section className="container">
            <div className={styles.breadcrumb}>
              <Link to={'/'} className={styles.breadcrumbLinkMain}>
                Головна <Icon icon="bxs:chevron-right" className={styles.breadcrumbIcon}></Icon>
              </Link>
              <Link to={'/shames'} className={styles.breadcrumbLinkMain}>
                Особи <Icon icon="bxs:chevron-right" className={styles.breadcrumbIcon}></Icon>
              </Link>
              <p className={styles.breadcrumbLinkCurrent}>{fullname}</p>
            </div>
            {isLoading ? (
              <PersonSkeleton />
            ) : deputy ? (
              <div className={styles.personIntroduction}>
                <div className={styles.personIntroductionImage}>
                  <img src={Tape} className={styles.tape} />
                  <img
                    src={imageUrl}
                    alt="Person"
                    className={styles.personPhoto}
                    width={509}
                    height={731}
                  />
                </div>
                <div className={styles.personInfo}>
                  <div className={styles.name}>{fullname}</div>
                  <div className={styles.characteristics}>
                    <div className={styles.option}>
                      <Icon
                        icon="fontisto:checkbox-active"
                        className={styles.breadcrumbIcon}
                      ></Icon>
                      <div className={styles.optionText}>
                        <h4>Обирався / обиралась від:</h4>
                        <p>{deputy.party.name}</p>
                      </div>
                    </div>
                    <div className={styles.option}>
                      <Icon icon="fontisto:persons" className={styles.breadcrumbIcon}></Icon>
                      <div className={styles.optionText}>
                        <h4>Фракція:</h4>
                        <p>{deputy.fraction}</p>
                      </div>
                    </div>
                    <div className={styles.option}>
                      <Icon icon="fontisto:suitcase" className={styles.breadcrumbIcon}></Icon>
                      <div className={styles.optionText}>
                        <h4>Місце роботи/посада:</h4>
                        <p>{deputy.placeOfEmployment}</p>
                      </div>
                    </div>
                    <div className={styles.option}>
                      <Icon icon="fontisto:wallet" className={styles.breadcrumbIcon} />
                      <div className={styles.optionText}>
                        <h4>Чи є у базі корупціонерів:</h4>
                        <p>{deputy.isCorrupt ? 'Так' : 'Ні'}</p>
                      </div>
                    </div>
                    <div className={styles.option}>
                      <Icon icon="mdi:office-building-outline" className={styles.breadcrumbIcon} />
                      <div className={styles.optionText}>
                        <h4>Асоційовані бізнеси:</h4>
                        {deputy.relatedBusinessess && deputy.relatedBusinessess.length > 0 ? (
                          <ul className={styles.list}>
                            {deputy.relatedBusinessess.map((item, index) => (
                              <li key={index}>{item.title}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className={styles.empty}>Немає даних</p>
                        )}
                      </div>
                    </div>
                    <div className={styles.option}>
                      <Icon icon="mdi:cash-multiple" className={styles.breadcrumbIcon} />
                      <div className={styles.optionText}>
                        <h4>Додаткові джерела доходу:</h4>
                        {deputy.otherIncomes.length > 0 ? (
                          <ul className={styles.list}>
                            {deputy.otherIncomes.map((item, index) => (
                              <li key={index}>{item.title}</li>
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
            ) : null}
          </section>
        </section>
        {deputy && (
          <section className={styles.latestBg}>
            <div className="container">
              <section className={styles.latest}>
                <div className={styles.latestHeader}>
                  <div className={styles.latestInfo}>
                    <p className={styles.latestTitle}>
                      Зашкварів:
                      {' ' + deputy.shames.length}
                    </p>
                    <p className={styles.latestDescription}>
                      Перевірте, в яких черкаських зашкварах засвітився депутат і як саме.
                    </p>
                  </div>
                  <div className={styles.latestButtons}>
                    <Link to={'/shames'} className={styles.latestButton}>
                      ВСІ ЗАШКВАРИ
                      <Icon icon="fontisto:arrow-right" className={styles.arrowRight}></Icon>
                    </Link>
                  </div>
                </div>
                {deputy.shames.length ? <PaginatedCards cards={deputy.shames} /> : ''}
              </section>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
};

export default PersonPage;
