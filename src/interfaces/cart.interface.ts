export interface ICartItem {
  id: number;
  shoppingCartId: number;
  programId: number;
  giftCardProductId: number;
  giftCardValue: number;
  giftCardCurrencyId: number;
  cashAmount: number;
  points: number;
  quantity: number;
  cartItemAmount: number;
  amountCurrencyId: number;
  createdDate: null;
  lastUpdatedDate: null;
}

export interface IGetShoppingCartItemsResponse {
  id: number;
  programMemberId: string;
  programId: number;
  totalAmount: number;
  totalAmountCurrencyId: number;
  cashAmount: number;
  points: number;
  createdDate: string;
  lastUpdatedDate: string;
  cartItems: ICartItem[];
}

export interface IShopingCartItem extends IGetShoppingCartItemsResponse {}

export interface ILineItem {
  giftCardProductVO: Record<string, number>;
  orderItemAmount: number;
  orderId?: string;
  orderItemStatus: string;
  cashAmount: number;
  currencyVO: Record<string, number>;
  points: number;
  loyyalCommissionAmount: number;
}

export interface IOrder {
  programMemberId: string;
  programMemberEmails: string[];
  programVO: Record<string, number>;
  cashAmount: number;
  currencyVO: Record<string, number>;
  points: number;
  loyyalCommissionAmount: number;
  orderAmount: number;
  orderStatus: string;
  lineItems: ILineItem[];
  burnShopBearer?: string;
}

export interface IFinalizeOrderResponse extends IOrder {
  paymentUrl: string;
  stripeIntentId: string;
  stripeCheckoutSessionId: string;
}
