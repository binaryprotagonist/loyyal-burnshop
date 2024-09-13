import { FC, useEffect, useState } from "react";
import { sentenceCase } from "change-case";
import { useNavigate } from "react-router-dom";
import WishlistBanner from "./wishlist-banner";
import {
  getWishlistItemsByProgramMemberId,
  removeGiftCardFromWishList
} from "@/services/gift.service";
import { enqueueSnackbar } from "notistack";
import { LoadingButton } from "@mui/lab";
import { useAppContext } from "@/context/appContext";
import { WishlistItem } from "@/interfaces/wishlist.interface";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { Box, Button, Dialog, DialogContent, Grid, Typography } from "@mui/material";

const Wishlist = () => {
  const { member, wishlistItems, setWishlistItems } = useAppContext();
  const [wishlistItemId, setWishlistItemId] = useState<number>(0);
  const [isItemRemovingFromWishlist, setIsItemRemovingFromWishlist] =
    useState<boolean>(false);

  const getWishlistItems = async () => {
    if (!member?.memberId) return;
    const response = await getWishlistItemsByProgramMemberId(member?.memberId);
    setWishlistItems(response?.wishlistItemVOS);
  };

  const handleClickOpen = (giftcardId: number) => {
    setWishlistItemId(giftcardId);
  };

  const handleClose = () => {
    setWishlistItemId(0);
  };

  const handleRemoveGiftCardFromWishList = async (wishlistItemId: number) => {
    setIsItemRemovingFromWishlist(true);
    await removeGiftCardFromWishList(wishlistItemId);
    setIsItemRemovingFromWishlist(false);
    enqueueSnackbar("Item removed from wishlist", { variant: "success" });
    getWishlistItems();
  };

  const handleConfirmClick = async () => {
    await handleRemoveGiftCardFromWishList(wishlistItemId);
    setWishlistItemId(0);
  };

  useEffect(() => {
    getWishlistItems();
  }, [member?.memberId]);

  return (
    <Box px={{ xs: 2, sm: 4, md: 8 }} my={{ xs: 1, sm: 2, md: 4 }}>
      <WishlistBanner />

      <Box my={4}>
        <Grid container spacing={3}>
          {wishlistItems?.map((giftCard: WishlistItem, index: number) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <GiftCard giftCard={giftCard} handleClickOpen={handleClickOpen} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Dialog open={Boolean(wishlistItemId)} onClose={handleClose}>
        <DialogContent>
          <Typography>Are you sure to remove this item from wishlist.</Typography>

          <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <LoadingButton
              loading={isItemRemovingFromWishlist}
              variant="contained"
              onClick={handleConfirmClick}
            >
              Confirm
            </LoadingButton>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Wishlist;

interface IGiftCardProps {
  giftCard: WishlistItem;
  handleClickOpen: (giftcardId: number) => void;
}

const GiftCard: FC<IGiftCardProps> = ({ giftCard, handleClickOpen }) => {
  const navigate = useNavigate();

  const productImg = giftCard?.productVO?.productImageUris[0];
  const brandImg = giftCard?.productVO?.brandVO?.brandImageUri;

  return (
    <Box
      sx={{
        width: "100%",
        height: "200px",
        my: 2,
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
        alt={giftCard?.productVO?.productName}
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
          top: "70%",
          left: "50%",
          width: "90%",
          transform: "translate(-50%, -40%)",
          bgcolor: "#fff",
          borderRadius: "14px",
          p: 2,
          boxShadow: "rgba(17, 17, 26, 0.1) 0px 0px 16px",
          zIndex: 1,
          opacity: 0,
          transition: "opacity 0.3s ease, transform 0.3s ease"
        }}
      >
        <Box
          sx={{ position: "absolute", top: "12px", right: "12px" }}
          onClick={() => handleClickOpen(giftCard?.id)}
        >
          <DeleteForeverOutlinedIcon />
        </Box>

        <Box sx={{ height: "50px", width: "50px" }}>
          <img
            src={import.meta.env.VITE_REACT_APP_CORE_ENGINE_URL + brandImg}
            alt={giftCard?.productVO?.productName}
            height={"100%"}
            width={"100%"}
          />
        </Box>

        <Typography sx={{ fontWeight: "500", color: "#3464B3" }}>
          {sentenceCase(giftCard?.productVO?.productName || "")}
        </Typography>
        <Typography sx={{ fontWeight: "500" }}>
          {giftCard?.productVO?.minValue} - {giftCard?.productVO?.maxValue} Miles
        </Typography>
        <Typography sx={{ color: "lightgrey" }}>Variants Available</Typography>
        <Button
          variant="contained"
          sx={{ mt: 1, width: "100%" }}
          onClick={() => {
            navigate(`/gift-cards/${giftCard?.productVO?.productCode}`);
          }}
        >
          Buy Now
        </Button>
      </Box>
    </Box>
  );
};
