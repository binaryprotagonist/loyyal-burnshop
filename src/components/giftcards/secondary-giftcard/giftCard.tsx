import { FC } from "react";
import { sentenceCase } from "change-case";
import { Box, Typography } from "@mui/material";
import { Favorite } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { IMember } from "@/interfaces/auth.interface";
import { IGiftCard } from "@/interfaces/gift.interface";
import { WishlistItem } from "@/interfaces/wishlist.interface";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

interface IGiftCardProps {
  member: IMember | null;
  giftCard: IGiftCard;
  isMdScreen: boolean;
  isSmScreen: boolean;
  wishlistItems: WishlistItem[];
  handleAddGiftCardToWishList: (productId: number) => void;
  handleRemoveGiftCardFromWishList: (wishlistItemId: number) => void;
  isInWishlist: Record<string, boolean>;
  setIsInWishlist: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  handleOpenNavigateModal: () => void;
}

const SecondaryGiftCard: FC<IGiftCardProps> = ({
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

  const productImg = giftCard?.productImageUris && giftCard?.productImageUris[0];

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
      style={{
        padding: "8px",
        borderRadius: "14px",
        backgroundColor: "white"
      }}
      sx={{
        position: "relative",
        cursor: "pointer"
      }}
      onClick={() => {
        navigate(`/gift-cards/${giftCard?.productCode}`);
      }}
    >
      <Box
        sx={{ position: "absolute", top: "15px", right: "15px" }}
        onClick={handleFavoriteClick}
      >
        {isInWishlist[giftCard?.id] ? (
          <Favorite sx={{ color: "red" }} />
        ) : (
          <FavoriteBorderOutlinedIcon />
        )}
      </Box>

      <Box
        sx={{
          width: { xs: "130px", sm: "180px", md: "230px", lg: "280px" },
          height: { xs: "100px", sm: "150px", md: "200px", lg: "250px" },
          borderRadius: "14px",
          boxShadow:
            "rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;",
          bgcolor: "white"
        }}
      >
        <img
          src={import.meta.env.VITE_REACT_APP_CORE_ENGINE_URL + productImg}
          alt={sentenceCase(giftCard?.productName || "")}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "14px"
          }}
        />
      </Box>

      <Box px={1}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: "500",
            color: "#0068C9",
            fontSize: { xs: "12px", sm: "12px", md: "14px", lg: "16px" }
          }}
        >
          {sentenceCase(giftCard?.productName || "")}
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "12px", sm: "14px", md: "16px", lg: "18px" },
            fontWeight: "500"
          }}
        >
          {giftCard?.maxValue} - {giftCard?.maxValue} Miles
        </Typography>
      </Box>
    </Box>
  );
};

export default SecondaryGiftCard;
