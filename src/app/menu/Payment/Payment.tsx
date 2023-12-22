import style from './Payment.module.css';
import DeliveryMethodSelector from '../AppMenu/DeliveryMethodSelector';
import PaymentMenu from './PaymentMenu';
import SelectedMenuItem from './SelectedMenuItem';
import { useContext } from 'react';
import { foodMenuPaymentContext } from '../page';
import { isCustomError } from '../types';

export default function Payment() {
  const ctx = useContext(foodMenuPaymentContext);

  if (isCustomError(ctx)) return <div>Couldn't compute payment!!</div>;

  const { selected_menu_items, payment_menu } = ctx;

  return (
    <div className={style.order_payment_cont}>
      <div className={style.flex_column}>
        <DeliveryMethodSelector />
        <div className={style.selected_items_cont}>
          {selected_menu_items.map((item) => (
            <SelectedMenuItem
              index={item.index}
              name={item.name}
              quantity={item.quantity}
              total_price={item.total_price}
            />
          ))}
        </div>
      </div>
      <PaymentMenu
        subtotal={payment_menu.subtotal}
        tax={payment_menu.tax}
        total={payment_menu.total}
        onClickPlaceOrder={payment_menu.onClickPlaceOrder}
      />
    </div>
  );
}
