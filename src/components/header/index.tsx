import { FC } from 'react'
import logo from '../../assets/images/logo.png'
import styles from './header.module.css'
import { Link } from 'react-router-dom'

const Header: FC = () => {

  return (
    <header className={styles.header}>
      <div className={styles.links}>
        <Link to="/shames" className={styles.link}>
          Зашквари
        </Link>
        <Link to="/rating" className={styles.link}>
          Особи
        </Link>
      </div>
      <Link to="/">
        <img src={logo} alt="logo" className={styles.logo} width={60} height={60} />
      </Link>
      <div className={styles.links}>
          <Link to="/about-us" className={styles.link}>
              Про нас
          </Link>
      </div>
    </header>
  )
}

export default Header
