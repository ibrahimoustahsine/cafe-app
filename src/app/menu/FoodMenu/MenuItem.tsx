import { log } from 'console';
import styles from './MenuItem.module.css';
import { CustomerOrderItem } from '../types';
import test from 'node:test';

export interface MenuItemProps {
  id: number;
  name: string;
  price: number;
  description: string;
  quantity: number;
  selectMenuItem: () => void;
}

export default function MenuItem({
  id,
  name,
  price,
  description,
  quantity,
  selectMenuItem,
}: MenuItemProps) {
  return (
    <div
      className={styles.menu_item}
      onClick={() => {
        selectMenuItem();
      }}
    >
      <p className={styles.menu_item_name}>{`${name}`}</p>
      <p className={styles.menu_item_price}>{`$${price}`}</p>
      <p className={styles.menu_item_description}>{`${description}`}</p>
      <div className={styles.menu_item_quantity_cont}>
        <span className={styles.menu_item_quantity_minus}></span>
        <span
          className={styles.menu_item_quantity_display}
        >{`${quantity}`}</span>
        <span className={styles.menu_item_quantity_plus}></span>
      </div>
    </div>
  );
}
