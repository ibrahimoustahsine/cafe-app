import styles from './EmployeeSelectionOption.module.css';

export default function EmployeeSelectionOption() {
  return (
    <div className={styles.view_selector}>
      <span className={styles.selector_img}></span>
      <p className={styles.selector_account_name}>Peter</p>
    </div>
  );
}
