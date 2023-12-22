import {
  Exact,
  MenuCategory,
  MenuItem,
  Place_OrderMutation,
} from '@/gql/__generated__/graphql';
import {
  FoodMenuPaymentState,
  FoodMenuPaymentContext,
  CustomError,
} from './types';
import { MenuCategoryProps } from './FoodMenu/MenuCategory';
import { MenuItemProps } from './FoodMenu/MenuItem';
import { SelectedMenuItemProps } from './Payment/SelectedMenuItem';
import { RestaurantOptionProps } from './FoodMenu/RestaurantSelector';
import { UseMutationExecute } from 'urql';
import { stat } from 'fs';

function get_order_items(state: FoodMenuPaymentState): number[][] {
  const items: number[][] = [];

  state.customer_order.forEach((item) => {
    items.push([item.item_id, item.quanitity]);
  });

  return items;
}

function get_price(state: FoodMenuPaymentState): number {
  let price = 0;

  state.customer_order.forEach((item) => {
    price += item.quanitity * item.unit_price;
  });

  return price;
}

export function getContext(
  state: FoodMenuPaymentState,
  setState: React.Dispatch<React.SetStateAction<FoodMenuPaymentState>>,
  placeOrder: UseMutationExecute<
    Place_OrderMutation,
    Exact<{
      customerId: number;
      price: number;
      restaurantId: number;
      items: number | number[] | (number | number[])[];
    }>
  >
): FoodMenuPaymentContext | CustomError {
  const { data } = state;
  if (!data)
    return {
      error_code: 44556,
      type: 'Nullcheck error',
      message: 'Data is undefined',
    };

  const ctx: FoodMenuPaymentContext = {
    categories: [],
    menu_items: [],
    payment_menu: {
      subtotal: 0,
      tax: 0,
      total: 0,
      async onClickPlaceOrder() {
        if (state.customer_order.size > 0 && state.selected_restaurant) {
          const result = await placeOrder({
            customerId: 1,
            items: get_order_items(state),
            restaurantId: state.selected_restaurant,
            price: get_price(state),
          });

          const { data, error } = result;

          if (!error) {
            state.customer_order = new Map();
            setState({ ...state });
          }
        }
      },
    },

    selected_menu_items: [],
    restaurants: {
      selected: {
        id: data.restaurant.id,
        name: data.restaurant.name,
      },
      options: [],
    },
  };

  const menu = data.restaurant.menus[0];
  if (!menu) return ctx;

  const categories = menu.categories;
  if (categories.length <= 0) return ctx;

  const categoriesProps: MenuCategoryProps[] = [];
  const menuItemsProps: MenuItemProps[] = [];

  const selected_category_id: number =
    data.restaurant.menus[0]!.categories[state.selected_category]!.id;
  categories.forEach((c) => {
    const { id, name, icon, item_count, menu_items } = c as MenuCategory;
    categoriesProps.push({
      id,
      name,
      item_count,
      selected: selected_category_id == id ? true : false,
    });

    if (selected_category_id != id) return;

    const cid = id;
    if (menu_items.length >= 0) {
      menu_items.forEach((i) => {
        const { id, name, description, price } = i as MenuItem;
        const item_in_customer_order = state.customer_order.get(id);
        let quantity = 0;
        if (item_in_customer_order) {
          quantity = item_in_customer_order.quanitity;
        }
        menuItemsProps.push({
          id,
          name,
          description,
          price,
          quantity,
          selectMenuItem() {
            state.customer_order.set(id, {
              category_id: cid,
              item_id: id,
              quanitity: 1,
              unit_price: price,
            });
            setState({ ...state });
          },
        });
      });
    }
  });

  let total = 0;
  let index = 1;

  const selectedMenuItemsProps: SelectedMenuItemProps[] = [];

  state.customer_order.forEach((item) => {
    total += item.quanitity * item.unit_price;
    const { category_id, item_id, quanitity, unit_price } = item;
    const category = categories.find((c) => c!.id == category_id);
    const selectedItem = category!.menu_items.find((i) => i!.id == item_id);

    selectedMenuItemsProps.push({
      index,
      name: selectedItem!.name,
      quantity: quanitity,
      total_price: quanitity * unit_price,
    });

    index += 1;
  });

  const { restaurants } = data;

  const restaurantOptionsProps: RestaurantOptionProps[] = [];
  if (restaurants.length > 0)
    restaurants.forEach((r) => {
      if (r!.id != ctx.restaurants.selected.id)
        restaurantOptionsProps.push({
          id: r!.id,
          name: r!.name,
          selectRestaurant: () => {
            /* Fetch and set state */
            console.log('Selecting restaurant with id :', r!.id);
            state.selected_restaurant = r!.id;
            state.customer_order.clear();
            setState({ ...state });
          },
        });
    });

  ctx.categories = categoriesProps;
  ctx.menu_items = menuItemsProps;
  ctx.selected_menu_items = selectedMenuItemsProps;
  ctx.payment_menu.subtotal = total;
  ctx.payment_menu.tax = total * 0.1;
  ctx.payment_menu.total = total + ctx.payment_menu.tax;
  ctx.restaurants.options = restaurantOptionsProps;

  return ctx;
}
