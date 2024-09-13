export type WishlistItem = {
  id: number;
  wishlistId: number;
  programMemberId: number | null;
  programVO: any | null;
  productVO: ProductVO;
  createdDate: string;
  lastUpdatedDate: string;
};

type ProductVO = {
  id: number;
  brandVO: BrandVO;
  redemptionMerchantVO: MerchantVO;
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
  createdDate: string;
  lastUpdatedDate: string;
  platformCategoryIds: number[];
  programCategoryIds: any[];
  platformCategoryAssignmentDataVOs: PlatformCategoryAssignmentDataVO[];
  programCategoryAssignmentDataVOs: any[];
  productImageUris: string[];
};

type BrandVO = {
  id: number;
  brandCode: string;
  brandName: string;
  brandImageUri: string;
  brandDescription: string;
  createdDate: string;
  lastUpdatedDate: string;
};

type MerchantVO = {
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
  city: any | null;
  primaryWarehouse: any | null;
  assignedShippingProfiles: any | null;
};

type CountryVO = {
  id: number;
  name: string;
  code: string;
  vat: number;
  continent: string;
  currencyId: number;
};

type CurrencyVO = {
  iso3CurrencyCode: string;
  currencyName: string;
  currencySymbol: string;
  id: number;
};

type PlatformCategoryAssignmentDataVO = {
  platformCategoryId: number;
  platformCategoryAssignmentId: number;
};
