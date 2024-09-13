import { Dispatch, FC } from "react";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import flags from "@/constants/flags.json";
import {
  Box,
  IconButton,
  TextField,
  Popover,
  styled,
  Typography,
  Badge,
  BadgeProps
} from "@mui/material";

import { IMember } from "@/interfaces/auth.interface";
import { WishlistItem } from "@/interfaces/wishlist.interface";
// Mui Icons
import { useAppContext } from "@/context/appContext";
import StarsOutlinedIcon from "@mui/icons-material/StarsOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

interface NavbarItemsProps {
  member: IMember | null;
  handleClickSearch: (event: React.MouseEvent<HTMLButtonElement>) => void;
  openSearch: boolean;
  anchorEl: HTMLElement | null;
  handleCloseSearch: () => void;
  idSearch: string | undefined;
  selectedCountry: { id: number; name: string; code?: string } | null;
  selectedCurrency: { id: number; name: string; code?: string } | null;
  setSelectedCountry: Dispatch<
    React.SetStateAction<{ id: number; name: string; code?: string } | null>
  >;
  setSelectedCurrency: Dispatch<
    React.SetStateAction<{ id: number; name: string; code?: string } | null>
  >;
  wishlistItems: WishlistItem[] | [];
  handleOpen: () => void;
  isMdScreen: boolean;
  searchValue: string;
  setSearchValue: Dispatch<React.SetStateAction<string>>;
  openSearchSuggestions: boolean;
  setOpenSearchSuggestions: Dispatch<React.SetStateAction<boolean>>;
  seachAutoSuggestions: string[];
  handleGoClick: () => void;
}

const NavbarItems: FC<NavbarItemsProps> = ({
  member,
  handleClickSearch,
  openSearch,
  anchorEl,
  handleCloseSearch,
  idSearch,
  selectedCountry,
  selectedCurrency,
  wishlistItems,
  handleOpen,
  isMdScreen,
  handleGoClick,
  searchValue,
  setSearchValue,
  seachAutoSuggestions
}) => {
  const navigate = useNavigate();
  const { points, programCurrency } = useAppContext();

  const flag = flags[(selectedCountry?.code || "USA") as keyof typeof flags];

  return (
    <Box
      sx={{
        gap: 3,
        display: "flex",
        alignItems: !isMdScreen ? "center" : "flex-start",
        flexDirection: !isMdScreen ? "row" : "column",
        justifyContent: "space-between",
        color: isMdScreen ? "#000" : "#fff"
      }}
    >
      <Box>
        <IconButton
          size="small"
          sx={{
            bgcolor: "#3464B3",
            ":hover": {
              backgroundColor: "#3464B2"
            }
          }}
          onClick={handleClickSearch}
        >
          <SearchIcon />
        </IconButton>

        <Popover
          id={idSearch}
          open={openSearch}
          anchorEl={anchorEl}
          onClose={handleCloseSearch}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          sx={{ top: "10px" }}
        >
          <Box p={2} sx={{ minWidth: "400px" }}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                size="small"
                placeholder="Search gift cards by brand"
                sx={{ width: "100%" }}
              />

              <LoadingButton
                variant="contained"
                sx={{ bgcolor: "#3464B3" }}
                onClick={() => handleGoClick()}
              >
                Go
              </LoadingButton>
            </Box>

            {/* Auto Suggestions */}
            <Box sx={{ pl: 1, mt: 1 }}>
              {seachAutoSuggestions?.map((suggestion) => (
                <Typography
                  key={suggestion}
                  sx={{ cursor: "pointer", ":hover": { color: "#3464B3" } }}
                  onClick={() => setSearchValue(suggestion)}
                >
                  {suggestion}
                </Typography>
              ))}
            </Box>
          </Box>
        </Popover>
      </Box>

      <CustomNavItem
        sx={{ display: "flex", alignItems: "center", gap: "5px" }}
        onClick={() => {
          if (member?.memberId) {
            navigate("/profile");
          } else {
            navigate("/login");
          }
        }}
      >
        <PersonOutlineOutlinedIcon sx={{ fontSize: "33px" }} />
        <CustomNavBox>
          {member?.memberId ? (
            <>
              <Typography
                sx={{
                  color: "#808080",
                  fontSize: "13px",
                  fontWeight: 600,
                  lineHeight: "15px"
                }}
              >
                {member?.firstName} {member?.lastName}
              </Typography>
              <Typography sx={{ fontSize: "14px", fontWeight: 600, lineHeight: "20px" }}>
                My Account
              </Typography>
            </>
          ) : (
            <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>Login</Typography>
          )}
        </CustomNavBox>
      </CustomNavItem>

      <CustomNavItem
        onClick={() => {
          navigate("/wishlist");
        }}
      >
        <Box>
          <StyledBadge badgeContent={wishlistItems?.length} color="info">
            <FavoriteBorderOutlinedIcon sx={{ fontSize: "30px" }} />
          </StyledBadge>
        </Box>
        <CustomNavBox ml={!member?.memberId ? 0 : "8px"}>
          {member?.memberId ? (
            <>
              <Typography
                sx={{
                  color: "#808080",
                  fontSize: "13px",
                  fontWeight: 600,
                  lineHeight: "15px"
                }}
              >
                Favorite
              </Typography>
              <Typography sx={{ fontSize: "14px", fontWeight: 600, lineHeight: "20px" }}>
                My Wishlist
              </Typography>
            </>
          ) : (
            <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>Favorite</Typography>
          )}
        </CustomNavBox>
      </CustomNavItem>

      <CustomNavItem>
        <StarsOutlinedIcon sx={{ fontSize: "30px" }} />

        <CustomNavBox>
          {member?.memberId ? (
            <>
              <Typography
                sx={{
                  color: "#808080",
                  fontSize: "13px",
                  fontWeight: 600,
                  lineHeight: "15px"
                }}
              >
                Your Miles
              </Typography>
              <Typography sx={{ fontSize: "14px", fontWeight: 600, lineHeight: "20px" }}>
                {points}
              </Typography>
            </>
          ) : (
            <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>Your Miles</Typography>
          )}
        </CustomNavBox>
      </CustomNavItem>

      {/* Country and Currency */}
      <Box
        sx={{
          border: "1px solid #80808080",
          borderRadius: "20px",
          display: "flex",
          alignItems: "center",
          gap: "5px",
          p: "5px 15px",
          cursor: "pointer",
          mt: !isMdScreen ? 0 : 1
        }}
        onClick={handleOpen}
      >
        <Box
          sx={{
            width: "25px",
            height: "18px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <img
            src={`data:image/svg+xml;utf8,${encodeURIComponent(flag)}`}
            alt={`flag`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain"
            }}
          />
        </Box>
        <Typography>
          {selectedCountry?.name ? selectedCountry.name : "United States"}
        </Typography>
        <Box sx={{ height: "20px", width: "1px", bgcolor: "#80808080" }}></Box>
        <Typography>
          {selectedCurrency?.name || programCurrency?.name || "USD"}
        </Typography>
      </Box>
    </Box>
  );
};

export default NavbarItems;

const CustomNavItem = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "5px",
  cursor: "pointer"
}));

const CustomNavBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  cursor: "pointer"
}));

const StyledBadge = styled(Badge)<BadgeProps>(() => ({
  "& .MuiBadge-badge": {
    right: 3,
    top: 3
  }
}));
