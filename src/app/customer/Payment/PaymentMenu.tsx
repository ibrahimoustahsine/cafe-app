import style from './PaymentMenu.module.css';

export interface PaymentMenuProps {
  subtotal: number;
  tax: number;
  total: number;
}

export default function PaymentMenu({
  subtotal,
  tax,
  total,
}: PaymentMenuProps) {
  return (
    <div className={style.payment_cont}>
      <div className={style.payment_cont_top}>
        <div className={style.payment_inner_cont}>
          <p className={style.payment_text}>Subtotal</p>
          <p className={style.payment_value}>{`$${subtotal.toFixed(2)}`}</p>
        </div>
        <div className={style.payment_inner_cont}>
          <p className={style.payment_text}>Tax</p>
          <p className={style.payment_value}>{`$${tax.toFixed(2)}`}</p>
        </div>
        <div className={style.payment_devider}></div>
        <div className={style.payment_inner_cont}>
          <p className={style.payment_text}>Total</p>
          <p className={style.payment_value}>{`$${total.toFixed(2)}`}</p>
        </div>
      </div>
      <div className={style.payment_cont_bottom}>
        <p className={style.payment_methods_text}>Payment method</p>
        <div className={style.payment_methods_cont}>
          <div className={style.payment_method_cont}>
            <div className={style.payment_method_icon}></div>
            <p className={style.payment_method_name}>Cash</p>
          </div>
          <div className={style.payment_method_cont}>
            <div className={style.payment_method_icon}></div>
            <p className={style.payment_method_name}>Credit Card</p>
          </div>
          <div className={style.payment_method_cont}>
            <div className={style.payment_method_icon}></div>
            <p className={style.payment_method_name}>E-Wallet</p>
          </div>
        </div>
        <button className={style.payment_button}>Place Order</button>
      </div>
    </div>
  );
}
