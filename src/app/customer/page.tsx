'use client';
import style from './menu.module.css';
import AppMenu from './AppMenu/AppMenu';
import FoodMenu from './FoodMenu/FoodMenu';
import Payment from './Payment/Payment';
import { FoodMenuPaymentViewDocument } from '@/gql/__generated__/graphql';
import { Client, Provider, fetchExchange, useQuery } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';
import React, { createContext, useEffect, useState } from 'react';
import {
  CustomError,
  FoodMenuPaymentContext,
  FoodMenuPaymentState,
  isCustomError,
} from './types';

import { getContext } from './helpers';
import { stat } from 'fs';

/* GraphQL client */
const client = new Client({
  url: 'http://localhost:4000/graphql',
  exchanges: [cacheExchange({}), fetchExchange],
});

/* Default Context */
const defaultContext: FoodMenuPaymentContext = {
  categories: [],
  menu_items: [],
  payment_menu: {
    subtotal: 0.0,
    tax: 0.0,
    total: 0.0,
  },
  selected_menu_items: [],
  restaurants: {
    selected: {
      id: -1,
      name: 'no restaurant here',
    },
    options: [],
  },
};

export const foodMenuPaymentContext = createContext<
  FoodMenuPaymentContext | CustomError
>(defaultContext);

function Menu() {
  const [state, setState] = useState<FoodMenuPaymentState>({
    customer_order: new Map(),
    selected_category: 0,
  });

  const [result] = useQuery({
    query: FoodMenuPaymentViewDocument,
    variables: {
      onlyActive: true,
      restaurant_id: state.selected_restaurant,
    },
  });
  const { data, fetching, error } = result;

  useEffect(() => {
    setState({
      customer_order: state.customer_order,
      selected_category: state.selected_category,
      selected_restaurant: data?.restaurant.id,
      data: data,
    });
  }, [data]);

  if (fetching) return <h1>Fetching....</h1>;
  else if (error) return <h1>Error!!</h1>;
  else if (data) {
    /* TODO: clean this up */
    const ctx = getContext(state, setState);

    if (isCustomError(ctx)) return <div>Error page</div>;
    return (
      <div className={style.container}>
        <foodMenuPaymentContext.Provider value={ctx}>
          <AppMenu />
          <FoodMenu />
          <Payment />
        </foodMenuPaymentContext.Provider>
      </div>
    );
  }
}
export default function MenuWrapper() {
  return (
    <Provider value={client}>
      <Menu />
    </Provider>
  );
}
//
