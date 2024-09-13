export interface IGiftCardProduct {
  id: number;
  brandId: number;
  redemptionMerchantId: number;
  productCode: string;
  productName: string;
  productImageUri: string;
  productImageUris: string[];
  productDescription: string;
  giftCardType: string;
  validityInMonths: number;
  termsAndConditions: string;
  howToUse: string;
  minValue: number;
  maxValue: number;
  denominationIncrement: number;
  currencyId: number;
  loyyalCommissionPercentage: number;
  fulfilmentType: string;
}

export interface getGiftCardProductsProps {
  redemptionMerchantId: number | null;
  pageNumber: number;
  pageSize: number;
  sortOrder?: string;
  sortBy?: string;
}

export interface ICurrency {
  iso3CurrencyCode: string;
  currencyName: string;
  currencySymbol: string;
  id: number;
}

export interface IProgram {
  id: number;
  programCode: string;
  programName: string;
  programType: "EARN" | "BURN";
  percentageOfCashbackToBeAccrued: number;
  costPerPoint: number;
  accrueNotFinalizedTransactions: boolean;
  clientId: number;
  createdDateInMillis: number;
  lastUpdatedDateInMillis: number;
  programLogoUri: string;
  productImageUris: string[];
  taxId: string;
  address: string;
  phone: string;
  contractReference: string;
  country: string;
  city: string;
  currencyVO: ICurrency;
  invoiceFrequencyInDays: number;
  websiteUrl: string;
  domain: string;
  loyaltyCurrencyId: number | null;
}

interface BrandVO {
  id: number;
  brandCode: string;
  brandName: string;
  brandImageUri: string;
  brandDescription: string;
  createdDate: string;
  lastUpdatedDate: string;
}

interface CountryVO {
  id: number;
  name: string;
  code: string;
  vat: number;
  continent: string;
  currencyId: number;
}

interface CurrencyVO {
  iso3CurrencyCode: string;
  currencyName: string;
  currencySymbol: string;
  id: number;
}

interface ShippingProfile {
  id: number;
  name: string;
  description: string;
  createdDate: string;
  lastUpdatedDate: string;
  countries: CountryVO[];
  isAssignedToSelectedRedemptionMerchant: boolean;
  isActiveForSelectedRedemptionMerchant: boolean;
  shippingProfileRedemptionMerchantIdForSelectedRedemptionMerchant: number;
}

interface RedemptionMerchantVO {
  id: number;
  merchantCode: string;
  merchantName: string;
  merchantDescription: string;
  merchantWebsiteUrl: string;
  merchantEmail: string;
  merchantAddress: string;
  termsAndConditionsTemplate: string;
  howToUseTemplate: string;
  createdDate: string;
  lastUpdatedDate: string;
  countryVO: CountryVO;
  city: null;
  primaryWarehouse: any;
  assignedShippingProfiles: ShippingProfile[];
}

export interface IGiftCard {
  id: number;
  brandVO: BrandVO;
  redemptionMerchantVO: RedemptionMerchantVO;
  productCode: string;
  productName: string;
  productImageUri: string;
  productDescription: string;
  giftCardType: string;
  validityInMonths: number;
  termsAndConditions: string;
  howToUse: string;
  minValue: number;
  maxValue: number;
  denominationIncrement: number;
  currencyVO: CurrencyVO;
  loyyalCommissionPercentage: number;
  fulfilmentType: string;
  productImageUris: string[];
  createdDate: string;
  lastUpdatedDate: string;
  platformCategoryIds: any[];
  programCategoryIds: any[];
  platformCategoryAssignmentDataVOs: any[];
  programCategoryAssignmentDataVOs: any[];
}

export interface subCategoryVO {
  id: number;
  categoryCode: string;
  categoryName: string;
  categoryDescription: string;
  parentCategoryId: number;
  subCategoryVOs: subCategoryVO[];
  programId: number;
  isHidden: boolean | null;
}

export interface IGetOrders {
  pageNumber: number;
  pageSize: number;
  programMemberId: string;
}

interface LineItem {
  id: number;
  orderItemCode: string;
  orderId: number;
  giftCardProductVO: IGiftCardProduct;
  orderItemAmount: number;
  orderItemStatus: string;
  orderItemQuantity: number | null;
  cashAmount: number;
  currencyVO: ICurrency;
  points: number;
  loyyalCommissionAmount: number;
  createdDate: string;
  lastUpdatedDate: string;
}

export interface Order {
  id: number;
  programMemberId: string;
  programMemberEmails: string[];
  programMemberName: string | null;
  programVO: IProgram;
  cashAmount: number;
  currencyVO: ICurrency;
  points: number;
  loyyalCommissionAmount: number;
  orderDate: string;
  orderAmount: number;
  orderStatus: string;
  lastUpdatedDate: string;
  lineItems: LineItem[];
  paymentUrl: string | null;
  stripeIntentId: string | null;
  stripeCheckoutSessionId: string | null;
  createdDate: string;
  burnShopBearer: string | null;
}

export interface ISearchGiftCardProducts {
  programId: number;
  searchQuery: string;
}

export interface IGetAutoSuggestions {
  input: string;
  programId: number;
}
