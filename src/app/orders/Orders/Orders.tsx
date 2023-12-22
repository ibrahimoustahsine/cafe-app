import styles from './Orders.module.css';
interface Order {
  order_id: number;
  order_date: string;
  total_price: number;
  customer_name: string;
  status: string;
  onClickFinish: () => void;
  onClickCancel: () => void;
}

export interface OrdersProps {
  orders: Order[];
}

export default function Orders({ orders }: OrdersProps) {
  return (
    <div className={styles.orders_container}>
      {orders.map((order) => (
        <div className={styles.order}>
          <span
            className={
              order.status == 'Pending' ? styles.pending : styles.finished
            }
          >
            {order.status}
          </span>
          <div className={styles.info}>
            <p>
              <span>Order Number: </span> {order.order_id}
            </p>
            <p>
              <span>Customer: </span>
              {order.customer_name}
            </p>
            <p>
              <span>Date: </span>
              {order.order_date}
            </p>
            <p>
              <span>Price: </span>
              {order.total_price}
            </p>
          </div>
          <div className={styles.buttons}>
            <button
              className={styles.finish}
              onClick={() => {
                order.onClickFinish();
              }}
            >
              finished
            </button>
            <button
              className={styles.cancel}
              onClick={() => {
                order.onClickCancel();
              }}
            >
              cancel
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
