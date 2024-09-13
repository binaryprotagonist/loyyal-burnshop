export const enum GIFT {
  GET_ORDERS = "/order/getOrders",
  CREATE_ORDER = "/order/createOrder",
  ADD_ITEM_TO_CART = "/shoppingCart/addItemToCart",
  GET_GIFT_CARD_PRODUCTS = "/product/getGiftCardProducts",
  INDEX_GIFT_CARD_PRODUCTS = "/product/indexGiftCardProducts",
  FINALIZE_ORDER = "/order/finalizeOrder?checkoutSessionId=",
  DETAILS = "/product/getGiftCardProductByProductCode?productCode=",
  GET_SHOPPING_CART_ITEMS = `/shoppingCart/getShoppingCartItems?programMemberId=`,
  ADD_GIFT_CARD_TO_WISHLIST = "/wishlist/addItem",
  GET_WISHILIST_ITEMS = "/wishlist/getItems?programMemberId",
  REMOVE_WISHILIST_ITEM = "/wishlist/removeItem?wishlistItemId=",
  GET_AUTO_SUGGESTIONS = "/product/getAutoCompleteSuggestions",
  SEARCH_GIFT_CARDS = "/product/searchForGiftCardProducts"
}

export const enum AUTH {
  LOGIN = "/program"
}

export const enum PROGRAM {
  GET_ALL_CURRENCIES = "/currency/getAllCurrencies",
  GET_ALL_PROGRAMS = "/program/getAllPrograms",
  GET_ALL_COUNTRIES = "/shippingProfile/getAllCountries",
  GET_PROGRAM_USING_DOMAIN = "/program/getProgramUsingDomain",
  GET_COUNTRY_PROGRAMS = "/program/getCountryPrograms",
  GET_CURRENCY_PROGRAMS = "/program/getCurrencyPrograms",
  GET_CATEGORIES = "/programCategory/getProgramCategoryTree",
  GET_GIFT_CARDS_BY_PROGRAM_CATEGORY = "/programCategory/getGiftCardProductsByProgramCategory",
  GET_PROGRAM_BY_PROGRAM_CODE = "/program/getProgramByProgramCode?programCode="
}

export const enum TEMPLATE {
  GET_TEMPLATE = "/template/getTemplateInstance?programCategoryId=",
  GET_COMPONENT_INSTANCES = "/template/getComponentInstancesUsingTemplateInstanceId?templateInstanceId="
}
