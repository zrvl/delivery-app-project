import { NavLink } from 'react-router-dom';
import styles from './header.module.css'

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.menu}>
        <NavLink className={styles.link} to="/">Shop</NavLink>
        <NavLink className={styles.link} to="/shopingCart">Shopping cart</NavLink>
      </div>
    </div>
  )
};
export default Header;
