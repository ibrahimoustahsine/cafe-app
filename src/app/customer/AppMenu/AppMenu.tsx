import styles from './AppMenu.module.css';

import Logo from './Logo';
import EmployeeSelectionOption from './EmployeeSelectionOption';

export default function AppMenu() {
  return (
    <div className={styles.left_app_menu}>
      <div className={styles.flex_column}>
        <Logo />
        <ul className={styles.app_menu_list}>
          <li className={styles.app_menu_item}>
            <a>Menu</a>
          </li>
          <li className={styles.app_menu_item}>
            <a>Accounting</a>
          </li>
        </ul>
      </div>
      <div className={styles.flex_column}>
        <EmployeeSelectionOption />
        <div className={styles.copyright}>
          <p className={styles.copyright_text}>2022 Tex APP</p>
        </div>
      </div>
    </div>
  );
}
