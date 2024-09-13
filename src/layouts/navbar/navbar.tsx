import { theme } from "@/theme";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NavbarItems from "./navbar-items";
import { useAppContext } from "@/context/appContext";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Popover,
  Typography,
  useMediaQuery
} from "@mui/material";
import CountryModal from "@/components/modals/CountryModal";
import { CountryItem } from "@/interfaces/program.interface";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import {
  getAllCountries,
  getAllCurrencies
  // getCountryPrograms,
  // getCurrencyPrograms
} from "@/services/program.service";
import SearchSuggestionsModal from "./search-suggestions-modal";
import {
  getAutoCompleteSuggestions,
  searchGiftCardProducts
} from "@/services/gift.service";
import { IGiftCard } from "@/interfaces/gift.interface";
import { LoadingButton } from "@mui/lab";

export const Navbar = () => {
  const navigate = useNavigate();
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));

  const {
    member,
    programDetails,
    wishlistItems,
    selectedCountry,
    selectedCurrency,
    setSelectedCountry,
    setSelectedCurrency,
    rootCategoryId,
    setSelectedCategoryId
  } = useAppContext();

  const [currencies, setCurrencies] = useState([]);
  const [open, setOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [countries, setCountries] = useState<CountryItem[] | []>([]);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [seachAutoSuggestions, setSearchAutoSuggestions] = useState<string[]>([]);
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [openSearchSuggestions, setOpenSearchSuggestions] = useState<boolean>(false);
  const [searchedGiftcards, setSearchedGiftCards] = useState<IGiftCard[]>([]);
  const [openNavigateModal, setOpenNavigateModal] = useState<boolean>(false);

  const logo = programDetails?.programLogoUri
    ? import.meta.env.VITE_REACT_APP_CORE_ENGINE_URL + programDetails?.programLogoUri
    : "/assets/logo/loyyal-logo.svg";

  const handleClickSearch = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseSearch = () => {
    setAnchorEl(null);
    setSearchValue("");
    setSearchAutoSuggestions([]);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleOpenNavigateModal = () => {
    setOpenNavigateModal(true);
  };

  const handleCloseNavigateModal = () => {
    setOpenNavigateModal(false);
  };

  const getCountries = async () => {
    // if (!programDetails?.id) return;
    const response = await getAllCountries();
    setCountries(response || []);
  };

  const getCurrencies = async () => {
    // if (!programDetails?.id) return;
    const response = await getAllCurrencies();
    setCurrencies(response || []);
  };

  const handleGoClick = async () => {
    setOpenSearchSuggestions(true);
    if (programDetails?.id) {
      const response = await searchGiftCardProducts({
        programId: programDetails?.id,
        searchQuery: searchValue
      });

      setSearchedGiftCards(response || []);
    }
  };

  useEffect(() => {
    getCountries();
    getCurrencies();
  }, [programDetails?.id]);

  const handleGetAutoCompleteSuggestions = async (search: string) => {
    if (!programDetails?.id) return;
    const response = await getAutoCompleteSuggestions({
      programId: programDetails?.id,
      input: search
    });

    setSearchAutoSuggestions(response || []);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue) {
        handleGetAutoCompleteSuggestions(searchValue);
      } else {
        setSearchAutoSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue]);

  const openSearch = Boolean(anchorEl);
  const idSearch = openSearch ? "simple-popover" : undefined;
  const openMenu = Boolean(menuAnchorEl);
  const idMenu = openMenu ? "menu-popover" : undefined;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        bgcolor: "#000",
        px: { xs: 2, sm: 3, md: 4, lg: 8 },
        py: 2
      }}
    >
      <Box>
        <Link to="/" onClick={() => setSelectedCategoryId(rootCategoryId)}>
          <Box
            sx={{
              width: 100,
              height: 40,
              display: "inline-flex"
            }}
          >
            <img alt="loyyal logo" src={logo} />
          </Box>
        </Link>
      </Box>

      {!isMdScreen && (
        <NavbarItems
          member={member}
          isMdScreen={isMdScreen}
          anchorEl={anchorEl}
          openSearch={openSearch}
          idSearch={idSearch}
          wishlistItems={wishlistItems}
          handleGoClick={handleGoClick}
          handleOpen={handleOpen}
          handleClickSearch={handleClickSearch}
          handleCloseSearch={handleCloseSearch}
          selectedCountry={selectedCountry}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          setSelectedCountry={setSelectedCountry}
          seachAutoSuggestions={seachAutoSuggestions}
          selectedCurrency={selectedCurrency}
          setSelectedCurrency={setSelectedCurrency}
          openSearchSuggestions={openSearchSuggestions}
          setOpenSearchSuggestions={setOpenSearchSuggestions}
        />
      )}

      {isMdScreen && (
        <Box>
          <Box
            aria-describedby={"menu-popover"}
            onClick={handleMenuClick}
            component="button"
            sx={{ bgcolor: "transparent", borderColor: "transparent" }}
          >
            <MenuRoundedIcon color="action" sx={{ fontSize: "25px" }} />
          </Box>

          <Popover
            id={idMenu}
            open={openMenu}
            anchorEl={menuAnchorEl}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
          >
            <Box sx={{ p: 2 }}>
              <NavbarItems
                member={member}
                isMdScreen={isMdScreen}
                anchorEl={anchorEl}
                openSearch={openSearch}
                idSearch={idSearch}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                wishlistItems={wishlistItems}
                handleGoClick={handleGoClick}
                handleOpen={handleOpen}
                handleClickSearch={handleClickSearch}
                handleCloseSearch={handleCloseSearch}
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
                selectedCurrency={selectedCurrency}
                seachAutoSuggestions={seachAutoSuggestions}
                setSelectedCurrency={setSelectedCurrency}
                openSearchSuggestions={openSearchSuggestions}
                setOpenSearchSuggestions={setOpenSearchSuggestions}
              />
            </Box>
          </Popover>
        </Box>
      )}

      {open && (
        <CountryModal
          open={open}
          handleClose={handleClose}
          countries={countries}
          currencies={currencies}
          selectedCountry={selectedCountry}
          selectedCurrency={selectedCurrency}
          setSelectedCountry={setSelectedCountry}
          setSelectedCurrency={setSelectedCurrency}
        />
      )}

      {openSearchSuggestions && (
        <SearchSuggestionsModal
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          searchedGiftCards={searchedGiftcards}
          openSearchSuggestions={openSearchSuggestions}
          handleOpenNavigateModal={handleOpenNavigateModal}
          setOpenSearchSuggestions={setOpenSearchSuggestions}
        />
      )}

      {/* Modal for navigate to login when adding product to wishlist */}
      {openNavigateModal && (
        <Dialog onClose={handleCloseNavigateModal} open={openNavigateModal}>
          <DialogContent>
            <Typography fontWeight={500}>
              To add this product to your wishlist, please login to your account.
            </Typography>

            <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
              <Button variant="outlined" onClick={handleCloseNavigateModal}>
                Cancel
              </Button>
              <LoadingButton variant="contained" onClick={() => navigate("/login")}>
                Login
              </LoadingButton>
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
};
