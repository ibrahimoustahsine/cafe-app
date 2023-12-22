import styles from './Logo.module.css';

export default function Logo() {
  return (
    <div className={styles.logo_cont}>
      <h1 className={styles.logo_text}>
        <a>Tex</a>
      </h1>
    </div>
  );
}
