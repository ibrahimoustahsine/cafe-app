import styles from './FoodMenu.module.css';

import RestaurantSelector from './RestaurantSelector';
import MenuCategory from './MenuCategory';
import MenuItem from './MenuItem';
import { useContext } from 'react';
import { foodMenuPaymentContext } from '../page';
import { isCustomError } from '../types';

export default function FoodMenu() {
  const ctx = useContext(foodMenuPaymentContext);

  if (isCustomError(ctx)) {
    return <div className="error">{`${ctx.message}`}</div>;
  }

  const { categories, menu_items, restaurants } = ctx;

  return (
    <div className={styles.middle_section}>
      <RestaurantSelector
        options={restaurants.options}
        selected={restaurants.selected}
      />
      <div className={styles.food_menu_cont}>
        <div className={styles.menu_categories}>
          {categories.map((category) => (
            <MenuCategory
              id={category.id}
              item_count={category.item_count}
              name={category.name}
              selected={category.selected}
            />
          ))}
        </div>
        <div className={styles.menu_items}>
          {menu_items.map((item) => (
            <MenuItem
              name={item.name}
              description={item.description}
              price={item.price}
              quantity={item.quantity}
              id={item.id}
              selectMenuItem={item.selectMenuItem}
            />
          ))}
        </div>
      </div>
      <div className={styles.orders_strip}>
        <div className={styles.order}></div>
      </div>
    </div>
  );
}
