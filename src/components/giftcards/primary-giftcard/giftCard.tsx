import { IMember } from "@/interfaces/auth.interface";
import { IGiftCard } from "@/interfaces/gift.interface";
import { WishlistItem } from "@/interfaces/wishlist.interface";
import { Favorite } from "@mui/icons-material";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { sentenceCase } from "change-case";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { theme } from "@/theme";

interface IGiftCardProps {
  member: IMember | null;
  giftCard: IGiftCard;
  wishlistItems: WishlistItem[];
  handleAddGiftCardToWishList: (productId: number) => void;
  handleRemoveGiftCardFromWishList: (wishlistItemId: number) => void;
  isInWishlist: Record<string, boolean>;
  setIsInWishlist: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  handleOpenNavigateModal: () => void;
}

const GiftCard: FC<IGiftCardProps> = ({
  member,
  giftCard,
  wishlistItems,
  handleAddGiftCardToWishList,
  handleRemoveGiftCardFromWishList,
  isInWishlist,
  setIsInWishlist,
  handleOpenNavigateModal
}) => {
  const navigate = useNavigate();

  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));

  const productImg = giftCard?.productImageUri
    ? giftCard?.productImageUri
    : giftCard?.productImageUris && giftCard?.productImageUris[0];

  const brandImg = giftCard?.brandVO?.brandImageUri;

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!member?.memberId) {
      handleOpenNavigateModal();
      return;
    }

    const wishlistItemId = isAlreadyInWishlist();
    if (isInWishlist[giftCard?.id] && wishlistItemId) {
      await handleRemoveGiftCardFromWishList(wishlistItemId);
      setIsInWishlist((prev) => ({ ...prev, [giftCard.id]: false }));
    } else {
      await handleAddGiftCardToWishList(giftCard?.id);
      setIsInWishlist((prev) => ({ ...prev, [giftCard.id]: true }));
    }
  };

  const isAlreadyInWishlist = () => {
    const wishlistItem = wishlistItems.find(
      (wishlistItem) => wishlistItem.productVO?.id === giftCard?.id
    );
    return wishlistItem?.id;
  };

  return (
    <Box
      sx={{
        width: { xs: "120px", sm: "160px", md: "300px" },
        height: { xs: "90px", sm: "110px", md: "180px" },
        borderRadius: "14px",
        cursor: "pointer",
        position: "relative",
        boxShadow:
          "rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;",
        "&:hover .hover-popup": {
          opacity: 1,
          transform: "translate(-50%, -50%)"
        }
      }}
    >
      <img
        src={
          productImg
            ? import.meta.env.VITE_REACT_APP_CORE_ENGINE_URL + productImg
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHOCzaEM17rj4LhXRx3nOezr76b-3BZ_WN_A&s"
        }
        alt={giftCard?.productName}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "10px"
        }}
      />

      <Box
        className="hover-popup"
        sx={{
          position: "absolute",
          top: { xs: "50%", sm: "50%", md: "70%", lg: "70%" },
          left: "50%",
          width: { xs: "120px", sm: "160px", md: "90%" },
          transform: "translate(-50%, -40%)",
          bgcolor: "#fff",
          borderRadius: "14px",
          p: { xs: 1, sm: 1, md: 2 },
          boxShadow: "rgba(17, 17, 26, 0.1) 0px 0px 16px",
          zIndex: 1,
          opacity: 0,
          transition: "opacity 0.3s ease, transform 0.3s ease"
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: { xs: "5px", sm: "8px", md: "12px", lg: "12px" },
            right: { xs: "5px", sm: "8px", md: "12px", lg: "12px" }
          }}
          onClick={handleFavoriteClick}
        >
          {isInWishlist[giftCard?.id] ? (
            <Favorite
              sx={{ color: "#3464B3" }}
              fontSize={isMdScreen ? "small" : "medium"}
            />
          ) : (
            <FavoriteBorderOutlinedIcon fontSize={isMdScreen ? "small" : "medium"} />
          )}
        </Box>

        <Box
          sx={{
            height: { xs: "20px", sm: "30px", md: "40px", lg: "50px" },
            width: { xs: "20px", sm: "30px", md: "40px", lg: "50px" }
          }}
        >
          <img
            src={import.meta.env.VITE_REACT_APP_CORE_ENGINE_URL + brandImg}
            alt={giftCard?.productName}
            height={"100%"}
            width={"100%"}
          />
        </Box>

        <Typography
          sx={{
            fontWeight: "500",
            color: "#3464B3",
            fontSize: { xs: "12px", sm: "14px", md: "16px", lg: "16px" }
          }}
        >
          {sentenceCase(giftCard?.productName || "")}
        </Typography>
        <Typography
          sx={{
            fontWeight: "500",
            fontSize: { xs: "12px", sm: "14px", md: "16px", lg: "16px" }
          }}
        >
          {giftCard?.minValue} - {giftCard?.maxValue} Miles
        </Typography>
        <Typography
          sx={{
            color: "lightgrey",
            fontSize: { xs: "12px", sm: "14px", md: "16px", lg: "16px" }
          }}
        >
          Variants Available
        </Typography>
        <Button
          variant="contained"
          sx={{
            mt: { xs: "2px", sm: 1, md: 1 },
            width: "100%",
            fontSize: { xs: "12px", sm: "14px", md: "16px", lg: "16px" }
          }}
          onClick={() => {
            navigate(`/gift-cards/${giftCard?.productCode}`);
          }}
          size={isMdScreen ? "small" : "medium"}
        >
          Buy Now
        </Button>
      </Box>
    </Box>
  );
};

export default GiftCard;
