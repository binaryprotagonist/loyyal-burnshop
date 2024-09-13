import {
  ICartItem,
  IOrder,
  IFinalizeOrderResponse,
  IGetShoppingCartItemsResponse
} from "@/interfaces/cart.interface";
import { apiService } from "./api.service";
import { GIFT, PROGRAM } from "@/constants/url.constants";

import {
  IGetAutoSuggestions,
  IGetOrders,
  IGiftCard,
  IProgram,
  ISearchGiftCardProducts,
  getGiftCardProductsProps
} from "@/interfaces/gift.interface";

/** ********************* GIFT SERVICES START ************************ */

// getGiftCardProducts
/**
 * @description Get gift card products
 * @param {}
 * @return IGiftCardProduct[]
 * @url /product/getGiftCardProducts
 * @method POST
 */

export const getGiftCardProducts = (data: getGiftCardProductsProps) => {
  return apiService.post(GIFT.GET_GIFT_CARD_PRODUCTS, data);
};

// addGiftItemToCart
/**
 * @description Add gift item to cart
 * @param {}
 * @return ICartItem[]
 * @url /product/getGiftCardProducts
 * @method POST
 */

export const addGiftItemToCart = (item: {
  programMemberId: string;
  programId: number;
  giftCardProductId: number;
  giftCardValue: number;
  giftCardCurrencyId: number;
  cashAmount: number;
  points: number;
  quantity: number;
  cartItemAmount: number;
  amountCurrencyId: number;
}): Promise<ICartItem> => {
  return apiService.post(GIFT.ADD_ITEM_TO_CART, item);
};

// getShoppingCartItems
/**
 * @description Add shoping cart items
 * @param {}
 * @return ICartItem[]
 * @url /shoppingCart/getShoppingCartItems?programMemberId=id
 * @method POST
 */

export const getShoppingCartItems = (
  programMemberId: string
): Promise<IGetShoppingCartItemsResponse> => {
  return apiService.get(`${GIFT.GET_SHOPPING_CART_ITEMS}${programMemberId}`);
};

// createOrder

/**
 * @description Create order
 * @param {}
 * @return ICartItem[]
 * @url /order/createOrder
 * @method POST
 */

export const createOrder = (order: IOrder): Promise<IFinalizeOrderResponse> => {
  return apiService.post(GIFT.CREATE_ORDER, order);
};

// Get program by program code
/**
 * @description get program by program codeS
 * @param {}
 * @return ICartItem[]
 * @url /program/getProgramByProgramCode?programCode=ET
 * @method POST
 */

export const getProgramByProgramCode = (programCode: string): Promise<IProgram> => {
  return apiService.get(`${PROGRAM.GET_PROGRAM_BY_PROGRAM_CODE}${programCode}`);
};

// Get product details by product code
/**
 * @description get product details by product code
 * @param {}
 * @return ICartItem[]
 * @url product/getGiftCardProductByProductCode?productCode=GC001
 * @method Get
 */

export const getProductDetailsByProductCode = (
  productCode: string
): Promise<IGiftCard> => {
  return apiService.get(`${GIFT.DETAILS}${productCode}`);
};

// Finalize order
/**
 * @description finalize order
 * @param {}
 * @return IFinalizeOrderResponse[]
 * @url order/finalizeOrder?checkoutSessionId={CHECKOUT_SESSION_ID}
 * @method POST
 */

export const finalizeOrder = (
  checkoutSessionId: string
): Promise<IFinalizeOrderResponse> => {
  return apiService.get(`${GIFT.FINALIZE_ORDER}${checkoutSessionId}`);
};

// Add GiftCard To WishList
/**
 * @description Add GiftCard To WishList
 * @param {}
 * @return
 * @url /wishlist/addItem
 * @method POST
 */

export const AddGiftCardToWishList = (data: {
  programMemberId: string;
  productVO: Record<string, number>;
  programVO: Record<string, number | undefined>;
}) => {
  return apiService.post(GIFT.ADD_GIFT_CARD_TO_WISHLIST, data);
};

// get Wishlist Items
/**
 * @description get Wishlist Items
 * @param {}
 * @return
 * @url /wishlist/getItems?programMemberId={programMemberId}
 * @method POST
 */

export const getWishlistItemsByProgramMemberId = (programMemberId: string) => {
  return apiService.get(`${GIFT.GET_WISHILIST_ITEMS}=${programMemberId}`);
};

// remove GiftCard From WishList
/**
 * @description remove GiftCard From WishList
 * @param {}
 * @return
 * @url /wishlist/getItems?programMemberId={programMemberId}&productId=${productId}
 * @method POST
 */

export const removeGiftCardFromWishList = (wishlistItemId: number) => {
  return apiService.post(`${GIFT.REMOVE_WISHILIST_ITEM}${wishlistItemId}`, {
    wishlistItemId
  });
};

// get Orders
/**
 * @description get Orders
 * @param {}
 * @return
 * @url /order/getOrders
 * @method POST
 */

export const getOrders = (data: IGetOrders) => {
  return apiService.post(`${GIFT.GET_ORDERS}`, data);
};

// Index GiftCards Products
/**
 * @description Index GiftCards Products
 * @param {}
 * @return
 * @url /product/indexGiftCardProducts
 * @method POST
 */

export const indexGiftCardProducts = () => {
  return apiService.get(GIFT.INDEX_GIFT_CARD_PRODUCTS);
};

// Search GiftCards Products
/**
 * @description Search GiftCards Products
 * @param {}
 * @return
 * @url /product/searchForGiftCardProducts
 * @method POST
 */

export const searchGiftCardProducts = (data: ISearchGiftCardProducts) => {
  return apiService.get(
    `${GIFT.SEARCH_GIFT_CARDS}?programId=${data.programId}&searchQuery=${data.searchQuery}`
  );
};

// Get auto suggestions
/**
 * @description get Auto Suggestions
 * @param {}
 * @return
 * @url /product/getAutoSuggestion
 * @method GET
 */

export const getAutoCompleteSuggestions = (data: IGetAutoSuggestions) => {
  return apiService.get(
    `${GIFT.GET_AUTO_SUGGESTIONS}?programId=${data.programId}&input=${data.input}`
  );
};
