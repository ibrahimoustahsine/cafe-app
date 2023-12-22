'use client';
import { Provider, UseMutationExecute, useMutation, useQuery } from 'urql';
import AppMenu from '../menu/AppMenu/AppMenu';
import Orders, { OrdersProps } from './Orders/Orders';
import styles from './orders.module.css';
import {
  Cancel_OrderDocument,
  Cancel_OrderMutation,
  Exact,
  Finish_OrderDocument,
  Finish_OrderMutation,
  OrdersDocument,
  OrdersQuery,
} from '@/gql/__generated__/graphql';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { stat } from 'fs';

interface Mutators {
  cancel_order: UseMutationExecute<
    Cancel_OrderMutation,
    Exact<{
      cancelOrderId: number;
    }>
  >;
  finish_order: UseMutationExecute<
    Finish_OrderMutation,
    Exact<{
      finishOrderId: number;
    }>
  >;
}

function getOrders(
  ordersQuery: OrdersQuery,
  setState: Dispatch<SetStateAction<OrdersQuery | undefined>>,
  { cancel_order, finish_order }: Mutators
): OrdersProps {
  const props: OrdersProps = { orders: [] };

  if (!ordersQuery) return props;

  ordersQuery.orders.forEach((order) => {
    if (order)
      props.orders.push({
        customer_name: order.customer_name,
        order_date: order.order_date,
        order_id: order.order_id,
        status: order.status,
        total_price: order.total_price,
        async onClickCancel() {
          const { data, error } = await cancel_order({
            cancelOrderId: order.order_id,
          });
          if (!error) setState({ ...ordersQuery });
        },
        async onClickFinish() {
          const { data, error } = await finish_order({
            finishOrderId: order.order_id,
          });
          if (!error) setState({ ...ordersQuery });
        },
      });
  });

  return props;
}

export default function OrdersPage() {
  const [state, setState] = useState<OrdersQuery>();

  const [result] = useQuery({
    query: OrdersDocument,
  });

  const [_, cancel_order] = useMutation(Cancel_OrderDocument);

  const [__, finish_order] = useMutation(Finish_OrderDocument);

  const { fetching, data, error } = result;

  useEffect(() => {
    if (data) setState({ orders: data.orders });
  }, [data]);

  if (error) return <div>Error page</div>;
  if (fetching) return <div>Fetching...</div>;
  return (
    <div className={styles.container}>
      <AppMenu />
      <div className={styles.grid}>
        <Orders
          orders={
            state
              ? getOrders(state, setState, { cancel_order, finish_order })
                  .orders
              : []
          }
        />
      </div>
    </div>
  );
}
