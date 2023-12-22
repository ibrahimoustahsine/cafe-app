import styles from './MenuCategory.module.css';

export interface MenuCategoryProps {
  id: number;
  name: string;
  item_count: number;
  selected: boolean;
}

export default function MenuCategory({ name, item_count }: MenuCategoryProps) {
  return (
    <div className={styles.menu_category}>
      <span className={styles.menu_category_icon}></span>
      <div className={styles.menu_category_info}>
        <h3 className={styles.menu_category_name}>{`${name}`}</h3>
        <p
          className={styles.menu_category_item_count}
        >{`${item_count} Items`}</p>
      </div>
    </div>
  );
}
