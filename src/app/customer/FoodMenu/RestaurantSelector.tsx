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
  return (
    <div className={styles.restaurant_selector}>
      <div className={styles.restaurant_display}>
        <p>{`${selected.name}`}</p>
      </div>
      <div className={styles.restaurant_selection}>
        {options.length == 0 ? (
          <div>There are no restaurants to choose from</div>
        ) : (
          options.map((option) => (
            <div onClick={option.selectRestaurant}>{`${option.name}`}</div>
          ))
        )}
      </div>
    </div>
  );
}
