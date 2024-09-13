import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.bubble.css";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Grid,
  Typography,
  useMediaQuery
} from "@mui/material";
// Images

import Template1Carousel from "../slider/Template1Carousel";
import {
  AddGiftCardToWishList,
  removeGiftCardFromWishList
} from "@/services/gift.service";
import { IComponentInstance } from "@/interfaces/template.interface";

import { theme } from "@/theme";
import { LoadingButton } from "@mui/lab";
import { enqueueSnackbar } from "notistack";
import { useAppContext } from "@/context/appContext";
import { WishlistItem } from "@/interfaces/wishlist.interface";
import GiftCard from "@/components/giftcards/primary-giftcard/giftCard";
import { IGiftCard, subCategoryVO } from "@/interfaces/gift.interface";

interface Template1Props {
  wishlistItems: WishlistItem[] | [];
  programId: number | undefined;
  giftCards: IGiftCard[];
  componentInstances: IComponentInstance[];
  selectedSubCategory: number | undefined;
  setSelectedSubCategory: React.Dispatch<number>;
  subCategoriesOfSelectedCategory: subCategoryVO[] | undefined;
}

const Template1: FC<Template1Props> = ({
  programId,
  giftCards,
  wishlistItems,
  componentInstances,
  selectedSubCategory,
  setSelectedSubCategory,
  subCategoriesOfSelectedCategory = []
}) => {
  const navigate = useNavigate();

  const { member, getWishlistItems } = useAppContext();
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [openNavigateModal, setOpenNavigateModal] = useState<boolean>(false);
  const [isInWishlist, setIsInWishlist] = useState<Record<string, boolean>>({});

  const componentInstanceConfig =
    componentInstances.length > 0
      ? componentInstances[componentInstances.length - 1].componentInstanceConfig
      : {};

  const sliderImages = componentInstanceConfig?.imageURLs?.sliderImages?.map(
    (image: string) => `${import.meta.env.VITE_REACT_APP_CORE_ENGINE_URL}${image}`
  );
  const bannerImages = componentInstanceConfig?.imageURLs?.bannerImages;
  const overlayText = componentInstanceConfig?.overlayText?.text;
  const position = {
    ...componentInstanceConfig?.overlayText?.position,
    y: componentInstanceConfig?.overlayText?.position?.y + 80
  };

  const templateImages = [
    {
      carouselImages: sliderImages
    },
    {
      image1: `${import.meta.env.VITE_REACT_APP_CORE_ENGINE_URL}${bannerImages?.image1}`
    },
    {
      image2: `${import.meta.env.VITE_REACT_APP_CORE_ENGINE_URL}${bannerImages?.image2}`
    },
    {
      image3: `${import.meta.env.VITE_REACT_APP_CORE_ENGINE_URL}${bannerImages?.image3}`
    }
  ];

  useEffect(() => {
    const initialWishlistState = wishlistItems.reduce(
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

  const handleCloseNavigateModal = () => {
    setOpenNavigateModal(false);
  };

  const handleOpenNavigateModal = () => {
    setOpenNavigateModal(true);
  };

  return (
    <Box sx={{ px: { xs: 2, sm: 3, md: 4, lg: 8 }, my: { xs: 2, sm: 3, md: 4 } }}>
      {/* Carousel */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <Box
          sx={{
            width: !isMdScreen ? "60%" : "100%",
            height: "100%",
            position: "relative"
          }}
        >
          <Template1Carousel
            images={templateImages[0]?.carouselImages || []}
            overlayText={overlayText}
            position={position}
          />
        </Box>

        {!isMdScreen && (
          <Box
            sx={{
              width: "40%",
              height: { xs: "150px", sm: "200px", md: "284px", lg: "384px" }
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 2,
                height: "50%"
              }}
            >
              <Box sx={{ width: "50%" }}>
                <img
                  src={templateImages[1]?.image1}
                  alt="templateBanner1"
                  style={{
                    borderRadius: "14px",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                  loading="lazy"
                  fetchPriority="high"
                />
              </Box>

              <Box sx={{ width: "50%" }}>
                <img
                  src={templateImages[2]?.image2}
                  alt="templateBanner2"
                  fetchPriority="high"
                  style={{
                    borderRadius: "14px",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                  loading="lazy"
                />
              </Box>
            </Box>

            <Box sx={{ mt: 2, height: "50%" }}>
              <img
                src={templateImages[3]?.image3}
                alt="templateBanner3"
                fetchPriority="high"
                style={{
                  borderRadius: "14px",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover"
                }}
                loading="lazy"
              />
            </Box>
          </Box>
        )}
      </Box>

      {/* Sub Categories for Selected Category */}
      {subCategoriesOfSelectedCategory?.length > 0 && (
        <Box sx={{ my: { xs: 2, sm: 2, md: 4 } }}>
          <Grid container spacing={2}>
            {subCategoriesOfSelectedCategory?.map((subCategory) => {
              const { id, categoryName } = subCategory;
              return (
                <Grid item key={id}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1,
                      py: 1,
                      px: 2,
                      border: "1px solid lightGrey",
                      borderRadius: "14px",
                      cursor: "pointer",
                      bgcolor: selectedSubCategory === id ? "#000" : "",
                      color: selectedSubCategory === id ? "#fff" : "",
                      "&:hover": {
                        bgcolor: "#000",
                        color: "#fff"
                      }
                    }}
                    onClick={() => {
                      setSelectedSubCategory(id);
                      navigate(`/category/${id}`);
                    }}
                  >
                    <Typography sx={{ fontWeight: "500", fontSize: "14px" }}>
                      {categoryName}
                    </Typography>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      )}

      {/* Gift Card & Vouchers */}
      <Box sx={{ mt: { xs: 2, sm: 2, md: 4 } }}>
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
              Login
            </LoadingButton>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export { Template1 };
