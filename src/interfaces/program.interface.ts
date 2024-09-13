export interface CountryVO {
  id: number;
  name: string;
  code: string;
  vat: number;
  continent: string;
  currencyId: number;
}

export interface CountryItem {
  id: number;
  name: string;
  code: string;
  vat: number;
  continent: string;
  currencyId: number;
}

export interface PartnerDetails {
  id: number;
  createdDateInMillis: number;
  lastUpdatedDateInMillis: number;
  partnerCode: string;
  partnerName: string;
  taxId: string;
  address: string;
  phone: string;
  businessLocation: string;
  currencyId: number;
  websiteUrl: string;
  businessDescription: string;
  country: string;
  city: string;
  costPerPoint: number;
  loyyalProfitPercentage: number;
}
