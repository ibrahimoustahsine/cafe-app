import { useState } from 'react';
import styles from './RestaurantSelector.module.css';

export interface RestaurantOptionProps {
  id: number;
  name: string;
  selectRestaurant: () => void;
}

export interface RestaurantSelectorProps {
  selected: {
    id: number;
    name: string;
  };
  options: RestaurantOptionProps[];
}

export default function RestaurantSelector({
  selected,
  options,
}: RestaurantSelectorProps) {
  const [expanded, setExpanded] = useState(false);

  function toggle() {
    if (expanded) {
      setExpanded(false);
    } else {
      setExpanded(true);
    }
  }

  return (
    <div className={styles.restaurant_selector}>
      <div className={styles.restaurant_display} onClick={toggle}>
        <p>{`${selected.name}`}</p>
      </div>
      {expanded && (
        <div className={styles.restaurant_selection}>
          {options.length == 0 ? (
            <div>There are no restaurants to choose from</div>
          ) : (
            options.map((option) => (
              <div
                className={styles.option_cont}
                onClick={option.selectRestaurant}
              >
                <p className={styles.option_text}>{`${option.name}`}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
