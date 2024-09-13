import { apiService } from "./api.service";
import { PROGRAM } from "@/constants/url.constants";

/** ********************* PROGRAM SERVICES START ************************ */

// getCountryPrograms
/**
 * @description getCountryPrograms
 * @param {}
 * @return {programId:number}
 * @url /program/getCountryPrograms
 * @method POST
 */

export const getCountryPrograms = (data: { programId: number }) => {
  return apiService.post(PROGRAM.GET_COUNTRY_PROGRAMS, data);
};

// getCurrencyPrograms
/**
 * @description getCurrencyPrograms
 * @param {}
 * @return {}
 * @url /program/getCurrencyPrograms
 * @method POST
 */

export const getCurrencyPrograms = (data: { programId: number }) => {
  return apiService.post(PROGRAM.GET_CURRENCY_PROGRAMS, data);
};

// get Categories
/**
 * @description getCategories
 * @param {}
 * @return {}
 * @url /programCategory/getProgramCategoryTree
 * @method POST
 */

export const getCategories = (data: {
  programId: number;
  programCategoryCode: string;
}) => {
  return apiService.get(
    `${PROGRAM.GET_CATEGORIES}?programId=${data.programId}&programCategoryCode=${data.programCategoryCode}`
  );
};

// getGiftCardProductsByProgramCategory
/**
 * @description get Gift Card Products By Program Category
 * @param {}
 * @return {}
 * @url /programCategory/getGiftCardProductsByProgramCategory
 * @method POST
 */

export const getGiftCardProductsByProgramCategory = (category: number | null) => {
  return apiService.get(
    `${PROGRAM.GET_GIFT_CARDS_BY_PROGRAM_CATEGORY}?programCategoryId=${category}`
  );
};

/** ********************* PROGRAM SERVICES END ************************ */

// Get All Currencies
/**
 * @description getAllCurrencies
 * @param {}
 * @return {}
 * @url /currency/getAllCurrencies
 * @method GET
 */

export const getAllCurrencies = () => {
  return apiService.get(`${PROGRAM.GET_ALL_CURRENCIES}`);
};

// Get Program Using Domain
/**
 * @description getProgramUsingDomain
 * @param {}
 * @return {}
 * @url /currency/getAllCurrencies
 * @method GET
 */

export const getProgramUsingDomain = (domain: string) => {
  return apiService.get(`${PROGRAM.GET_PROGRAM_USING_DOMAIN}?domain=${domain}`);
};

// Get all countries
/**
 * @description getAllCountries
 * @param {}
 * @return {}
 * @url /shippingProfile/getAllCountries
 * @method GET
 */

export const getAllCountries = () => {
  return apiService.get(`${PROGRAM.GET_ALL_COUNTRIES}`);
};
