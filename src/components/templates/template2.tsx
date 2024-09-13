import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Typography,
  useMediaQuery
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { IGiftCard } from "@/interfaces/gift.interface";
import { IComponentInstance } from "@/interfaces/template.interface";

import { theme } from "@/theme";
import { useAppContext } from "@/context/appContext";

// Images
// import bannerImage from "@/assets/template2/snow.png";
import {
  AddGiftCardToWishList,
  removeGiftCardFromWishList
} from "@/services/gift.service";
import { LoadingButton } from "@mui/lab";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import SecondaryGiftCard from "../giftcards/secondary-giftcard/giftCard";

interface ITemplate2Props {
  programId: number | undefined;
  giftCards: IGiftCard[];
  componentInstances: IComponentInstance[];
}

const Template2: FC<ITemplate2Props> = ({ giftCards, componentInstances, programId }) => {
  const navigate = useNavigate();

  const { member, wishlistItems, getWishlistItems } = useAppContext();
  const [isInWishlist, setIsInWishlist] = useState<Record<string, boolean>>({});
  const [openNavigateModal, setOpenNavigateModal] = useState<boolean>(false);

  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleAddGiftCardToWishList = async (productId: number) => {
    if (member) {
      const data = {
        programMemberId: member.memberId,
        productVO: { id: productId },
        programVO: { id: programId }
      };
      await AddGiftCardToWishList(data);
      getWishlistItems();
      enqueueSnackbar("Item added to wishlist", { variant: "success" });
    }
  };

  const handleRemoveGiftCardFromWishList = async (wishlistItemId: number) => {
    await removeGiftCardFromWishList(wishlistItemId);
    await getWishlistItems();
    enqueueSnackbar("Item removed from wishlist", { variant: "success" });
  };

  useEffect(() => {
    const initialWishlistState = wishlistItems?.reduce(
      (acc, item) => {
        acc[item.productVO?.id] = true;
        return acc;
      },
      {} as Record<string, boolean>
    );
    setIsInWishlist(initialWishlistState);
  }, [wishlistItems]);

  const handleCloseNavigateModal = () => {
    setOpenNavigateModal(false);
  };

  const handleOpenNavigateModal = () => {
    setOpenNavigateModal(true);
  };

  const componentInstanceConfig =
    componentInstances?.length > 0
      ? componentInstances[componentInstances.length - 1]?.componentInstanceConfig
      : { imageURLs: [] };

  const imageURL =
    componentInstanceConfig?.imageURLs?.length > 0
      ? componentInstanceConfig?.imageURLs[0]
      : "";

  const bannerImage = import.meta.env.VITE_REACT_APP_CORE_ENGINE_URL + imageURL || "";

  const headingText = componentInstanceConfig?.overlayText?.heading || "";
  const desc = componentInstanceConfig?.overlayText?.description || "";

  return (
    <Box
      sx={{
        height: isMdScreen ? "100vh" : "120vh",
        backgroundImage: `url(${bannerImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      <Box
        sx={{
          color: "#fff",
          px: isSmScreen ? 2 : isMdScreen ? 6 : 12,
          mt: isSmScreen ? 5 : isMdScreen ? 8 : 10,
          textAlign: isSmScreen ? "center" : "left"
        }}
      >
        <Typography variant={isSmScreen ? "h4" : isMdScreen ? "h3" : "h2"}>
          {headingText && headingText}
        </Typography>
        <Typography
          variant={isSmScreen ? "body1" : isMdScreen ? "h6" : "h6"}
          sx={{ width: isSmScreen ? "100%" : isMdScreen ? "550px" : "800px" }}
        >
          {desc && desc}
        </Typography>
      </Box>

      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
            px: 12,
            pb: 4
          }}
        >
          {giftCards?.map((giftCard) => {
            return (
              <SecondaryGiftCard
                member={member}
                key={giftCard.id}
                giftCard={giftCard}
                isMdScreen={isMdScreen}
                isSmScreen={isSmScreen}
                wishlistItems={wishlistItems}
                handleAddGiftCardToWishList={handleAddGiftCardToWishList}
                handleRemoveGiftCardFromWishList={handleRemoveGiftCardFromWishList}
                isInWishlist={isInWishlist}
                setIsInWishlist={setIsInWishlist}
                handleOpenNavigateModal={handleOpenNavigateModal}
              />
            );
          })}
        </Box>
      </Box>

      {/* Modal for navigate to login when adding product to wishlist */}
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
              Confirm
            </LoadingButton>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export { Template2 };
