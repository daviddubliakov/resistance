import arrowDown from '../../../assets/images/arrow_down.png';
import st from './hero.module.css';

export const Hero = () => {
  return (
    <section className={st.main}>
      <div className="container">
        <section className={st.introduction}>
          <div className={st.sitename}>
            <p className={st.site}>ПРО</p>
            <p className={st.name}>ПРОЄКТ</p>
          </div>
          <div className={st.whiteLine}></div>
          <p className={st.goal}>
            <span>
              <strong>&laquo;Черкаське досьє&raquo;</strong> &mdash; спільний проєкт багатьох
              представників громадського активу Черкас. Його зроблено на волонтерських засадах і він
              не фінансується жодною організацією чи приватною особою.
            </span>
            <br />
            <br />
            <span>
              Цей сайт &mdash; &quot;зовнішній носій&quot; пам&apos;яті виборців про діяльність
              представників міської влади та їхню причетність до подій, які викликали суспільний
              резонанс.
            </span>
          </p>
          <div className={st.arrows}>
            <img src={arrowDown} alt="arrow" />
            <img src={arrowDown} alt="arrow" />
            <img src={arrowDown} alt="arrow" />
          </div>
        </section>
      </div>
    </section>
  );
};
