import arrowDown from '../../../assets/images/arrow_down.png';
import styles from './introduction.module.css';

const Introduction = () => {
  return (
    <div className="container">
      <section className={styles.introduction}>
        <div className={styles.sitename}>
          <p className={styles.site}>ЧЕРКАСЬКЕ</p>
          <p className={styles.name}>ДОСЬЄ</p>
        </div>
        <div className={styles.whiteLine}></div>
        <p className={styles.goal}>
          Проєкт створений, щоб фіксувати шкідливі або суперечливі рішення міської влади, виявляти
          їхню причетність до черкаських зашкварів і дати можливість жителям громади відстежувати
          доброчесність кожного депутата Черкаської міської ради і не тільки.
        </p>
        <div className={styles.arrows}>
          <img src={arrowDown} alt="arrow" />
          <img src={arrowDown} alt="arrow" />
          <img src={arrowDown} alt="arrow" />
        </div>
      </section>
    </div>
  );
};

export default Introduction;
