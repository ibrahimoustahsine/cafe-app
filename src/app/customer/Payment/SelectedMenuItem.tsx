import style from './SelectedMenuItem.module.css';

export interface SelectedMenuItemProps {
  index: number;
  name: string;
  quantity: number;
  total_price: number;
}

export default function SelectedMenuItem({
  index,
  name,
  quantity,
  total_price,
}: SelectedMenuItemProps) {
  return (
    <div className={style.selected_menu_item}>
      <div>
        <span>{`${index}`}</span>
        <p>
          {`${name}`}
          <span>x{`${quantity}`}</span>
        </p>
      </div>
      <span>{`$${total_price}`}</span>
    </div>
  );
}
