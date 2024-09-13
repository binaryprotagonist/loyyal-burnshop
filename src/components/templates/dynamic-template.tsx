import { FC, useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Typography,
  useMediaQuery
} from "@mui/material";
import Carousel from "../dynamic-template/carousel";
import Subcategories from "../dynamic-template/subcategory";
import { IGiftCard, subCategoryVO } from "@/interfaces/gift.interface";
import GiftCard from "../giftcards/primary-giftcard/giftCard";
import SecondaryGiftCard from "../giftcards/secondary-giftcard/giftCard";
import { useAppContext } from "@/context/appContext";
import { theme } from "@/theme";
import {
  AddGiftCardToWishList,
  removeGiftCardFromWishList
} from "@/services/gift.service";
import { enqueueSnackbar } from "notistack";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";

interface IDynamicTemplateProps {
  giftCards: IGiftCard[];
  componentInstances: any;
  setSelectedSubCategory: React.Dispatch<number>;
  subCategoriesOfSelectedCategory: subCategoryVO[] | [];
}

const DynamicTemplate: FC<IDynamicTemplateProps> = ({
  giftCards,
  componentInstances,
  setSelectedSubCategory,
  subCategoriesOfSelectedCategory
}) => {
  const componentInstancesLength = componentInstances?.length;
  const componentInstancesConfig =
    componentInstancesLength > 0
      ? componentInstances[componentInstancesLength - 1]?.componentInstanceConfig
      : { componentInstances: [] };

  return (
    <Box sx={{ px: { xs: 2, sm: 3, md: 4, lg: 8 }, my: { xs: 2, sm: 3, md: 4 } }}>
      {componentInstancesConfig?.componentInstances?.map(
        (componentInstance: any, index: number) => {
          return (
            <Box key={index}>
              {componentInstance?.componentId === 1 && (
                <Carousel
                  key={componentInstance?.componentId}
                  componentInstanceConfig={componentInstance?.componentInstanceConfig}
                />
              )}

              {componentInstance?.componentId === 2 && (
                <Subcategories
                  setSelectedSubCategory={setSelectedSubCategory}
                  subCategoriesOfSelectedCategory={subCategoriesOfSelectedCategory}
                />
              )}

              {componentInstance?.componentId === 5 && (
                <GiftCards
                  key={componentInstance?.componentId}
                  giftCards={giftCards}
                  primaryGiftCard={
                    componentInstance?.componentInstanceConfig?.cardListingComponent1
                      ? true
                      : false
                  }
                />
              )}
            </Box>
          );
        }
      )}
    </Box>
  );
};

export default DynamicTemplate;

interface IGiftCardsProps {
  giftCards: IGiftCard[];
  primaryGiftCard?: boolean;
}

const GiftCards: FC<IGiftCardsProps> = ({ giftCards, primaryGiftCard }) => {
  const navigate = useNavigate();

  const { member, getWishlistItems, wishlistItems, programDetails } = useAppContext();
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [openNavigateModal, setOpenNavigateModal] = useState<boolean>(false);
  const [isInWishlist, setIsInWishlist] = useState<Record<string, boolean>>({});

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

  const handleAddGiftCardToWishList = async (productId: number) => {
    if (member) {
      const data = {
        programMemberId: member.memberId,
        productVO: { id: productId },
        programVO: { id: programDetails?.id }
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

  const handleCloseNavigateModal = () => {
    setOpenNavigateModal(false);
  };

  const handleOpenNavigateModal = () => {
    setOpenNavigateModal(true);
  };

  return (
    <Box>
      {primaryGiftCard ? (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
            justifyContent: giftCards?.length > 3 ? "space-between" : ""
          }}
        >
          {giftCards?.map((giftCard: IGiftCard, index: number) => (
            <GiftCard
              key={index}
              member={member}
              giftCard={giftCard}
              wishlistItems={wishlistItems}
              handleAddGiftCardToWishList={handleAddGiftCardToWishList}
              handleRemoveGiftCardFromWishList={handleRemoveGiftCardFromWishList}
              isInWishlist={isInWishlist}
              setIsInWishlist={setIsInWishlist}
              handleOpenNavigateModal={handleOpenNavigateModal}
            />
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap"
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
      )}

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
