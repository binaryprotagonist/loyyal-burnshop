import { IMember } from "@/interfaces/auth.interface";
import { ICurrency, IProgram } from "@/interfaces/gift.interface";
import { WishlistItem } from "@/interfaces/wishlist.interface";
import { storageService } from "@/services";
import { getWishlistItemsByProgramMemberId } from "@/services/gift.service";
import { getAllCurrencies, getProgramUsingDomain } from "@/services/program.service";
import React, { useEffect, useState } from "react";

interface ICountry {
  id: number;
  name: string;
  code?: string;
}

interface IAppContext {
  member: IMember | null;
  programCode: string;
  setMember: React.Dispatch<React.SetStateAction<any>>;
  wishlistItems: WishlistItem[] | [];
  setWishlistItems: React.Dispatch<React.SetStateAction<WishlistItem[] | []>>;
  getWishlistItems: () => void;
  programDetails: IProgram | null;
  currencyId: number | undefined;
  setCurrencyId: React.Dispatch<React.SetStateAction<number | undefined>>;
  selectedCountry: ICountry | null;
  setSelectedCountry: React.Dispatch<React.SetStateAction<ICountry | null>>;
  selectedCurrency: ICountry | null;
  setSelectedCurrency: React.Dispatch<React.SetStateAction<ICountry | null>>;
  points: number;
  setPoints: React.Dispatch<React.SetStateAction<number>>;
  selectedCategoryId: number | undefined;
  setSelectedCategoryId: React.Dispatch<React.SetStateAction<number | undefined>>;
  rootCategoryId: number | undefined;
  setRootCategoryId: React.Dispatch<React.SetStateAction<number | undefined>>;
  programCurrency: ICountry | null;
}

export const AppContext = React.createContext({} as IAppContext);

export const useAppContext = () => React.useContext(AppContext);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [currencyId, setCurrencyId] = useState<number>();
  const [member, setMember] = useState<IMember | null>(null);
  const [points, setPoints] = useState<number>(
    Number(storageService.getFromLocalStorage("points")) || 0
  );
  const [programCode, setProgramCode] = useState<string>("");
  const [rootCategoryId, setRootCategoryId] = useState<number>();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [programDetails, setProgramDetails] = useState<IProgram | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<ICountry | null>(null);
  const [programCurrency, setProgramCurrency] = useState<ICountry | null>(null);

  const getWishlistItems = async () => {
    if (!member?.memberId) return;
    const response = await getWishlistItemsByProgramMemberId(member?.memberId);
    setWishlistItems(response?.wishlistItemVOS || []);
  };

  const getMemberCurrency = async () => {
    if (!currencyId) return;
    const response = await getAllCurrencies();
    const currency = response?.find((currency: ICurrency) => currency?.id === currencyId);
    setProgramCurrency({ id: currency?.id, name: currency?.iso3CurrencyCode });
  };

  const getProgramByDomain = async (domain: string) => {
    const response = await getProgramUsingDomain(domain);
    setProgramDetails(response);
    setProgramCode(response?.programCode);
    setCurrencyId(response?.currencyVO?.id);
  };

  useEffect(() => {
    const getHostnameFromUrl = (url: string): string => {
      const { hostname } = new URL(url);
      return hostname;
    };
    const url = window.location.href;
    const hostname = getHostnameFromUrl(url);
    if (hostname) {
      getProgramByDomain(hostname);
    }
  }, []);

  useEffect(() => {
    getWishlistItems();
  }, [member?.memberId]);

  useEffect(() => {
    getMemberCurrency();
  }, [currencyId]);

  useEffect(() => {
    const country = storageService.getFromLocalStorage("country") as ICountry;
    const currency = storageService.getFromLocalStorage("currency") as ICountry;

    if (country) setSelectedCountry(country);
    if (currency) setSelectedCurrency(currency);
  }, []);

  const value: IAppContext = {
    member,
    setMember,
    points,
    setPoints,
    currencyId,
    programCode,
    setCurrencyId,
    rootCategoryId,
    setRootCategoryId,
    programCurrency,
    wishlistItems,
    setWishlistItems,
    getWishlistItems,
    programDetails,
    selectedCountry,
    setSelectedCountry,
    selectedCurrency,
    setSelectedCurrency,
    selectedCategoryId,
    setSelectedCategoryId
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
