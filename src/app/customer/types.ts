import { FoodMenuPaymentViewQuery } from '@/gql/__generated__/graphql';
import { MenuCategoryProps } from './FoodMenu/MenuCategory';
import { MenuItemProps } from './FoodMenu/MenuItem';
import { PaymentMenuProps } from './Payment/PaymentMenu';
import { SelectedMenuItemProps } from './Payment/SelectedMenuItem';
import { RestaurantSelectorProps } from './FoodMenu/RestaurantSelector';

export interface CustomError {
  error_code: number;
  type: string;
  message: string;
}

export function isCustomError(data: any | CustomError): data is CustomError {
  return 'error_code' in data;
}

export interface FoodMenuPaymentContext {
  categories: MenuCategoryProps[];
  menu_items: MenuItemProps[];
  payment_menu: PaymentMenuProps;
  selected_menu_items: SelectedMenuItemProps[];
  restaurants: RestaurantSelectorProps;
  // incrementSelectedMenuItem?: (id: number) => void;
  // decrementSelectedMenuItem?: (id: number) => void;
  // selectMenuItem?: (id: number) => void;
  // removeSelectedMenuItem?: (id: number) => void;
  // selectDifferentCategory?: (id: number) => void;
  // placeOrder?: () => void;
  // selectRestaurant?: () => void;
}

export interface CustomerOrderItem {
  category_id: number;
  item_id: number;
  unit_price: number;
  quanitity: number;
}

export interface FoodMenuPaymentState {
  customer_order: Map<number, CustomerOrderItem>;
  data?: FoodMenuPaymentViewQuery;
  selected_category: number;
  selected_restaurant?: number;
}
