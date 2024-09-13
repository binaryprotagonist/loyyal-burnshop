import { FC } from "react";
import { theme } from "@/theme";
import { LoadingButton } from "@mui/lab";
import { sentenceCase } from "change-case";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Dialog, Typography, useMediaQuery } from "@mui/material";
import { IGiftCard } from "@/interfaces/gift.interface";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/appContext";
import { AddGiftCardToWishList } from "@/services/gift.service";
import { enqueueSnackbar } from "notistack";

interface Props {
  openSearchSuggestions: boolean;
  setOpenSearchSuggestions: React.Dispatch<React.SetStateAction<boolean>>;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  searchedGiftCards: IGiftCard[];
  handleOpenNavigateModal: () => void;
}

const SearchSuggestionsModal: FC<Props> = ({
  searchValue,
  setSearchValue,
  searchedGiftCards,
  openSearchSuggestions,
  setOpenSearchSuggestions,
  handleOpenNavigateModal
}) => {
  const navigate = useNavigate();
  const { member, getWishlistItems, programDetails } = useAppContext();
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleAddGiftCardToWishList = async (productId: number) => {
    if (!member?.memberId) {
      handleOpenNavigateModal();
      return;
    }

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

  return (
    <Dialog
      open={openSearchSuggestions}
      onClose={() => setOpenSearchSuggestions(false)}
      maxWidth="lg"
    >
      <Box
        sx={{
          padding: "10px 20px",
          gap: 5,
          overflowX: "hidden",
          width: { sx: "100%", sm: "100%", md: "700px" },
          minHeight: "200px"
        }}
      >
        <CloseIcon
          onClick={() => setOpenSearchSuggestions(false)}
          fontSize="small"
          sx={{ cursor: "pointer", position: "absolute", top: 10, right: 15 }}
        />

        <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
          <Typography sx={{ fontWeight: 600 }}>Search Results</Typography>

          {searchValue && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                bgcolor: "#2F2B3D14",
                px: 1,
                borderRadius: "2px"
              }}
            >
              <Typography pb={"2px"}>{searchValue}</Typography>
              <CloseIcon
                onClick={() => setSearchValue("")}
                fontSize="small"
                sx={{ cursor: "pointer" }}
              />
            </Box>
          )}
        </Box>

        {/* Search Suggestions */}

        <Box sx={{ mt: 1 }}>
          {searchedGiftCards?.map(
            ({ id, productName, minValue, maxValue, productCode, productImageUri }) => {
              return (
                <Box
                  key={id}
                  sx={{
                    border: "1px solid lightgray",
                    borderRadius: "5px",
                    padding: 3,
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: isMdScreen ? "column" : "row",
                    alignItems: isMdScreen ? "flex-start" : "center",
                    my: 2
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2
                    }}
                  >
                    <Box
                      sx={{
                        width: { xs: "120px", sm: "150px", md: "200px" },
                        height: { xs: "80px", sm: "100px", md: "130px" }
                      }}
                    >
                      <img
                        src={
                          import.meta.env.VITE_REACT_APP_CORE_ENGINE_URL + productImageUri
                        }
                        alt="product"
                        width={"100%"}
                        height={"100%"}
                        style={{
                          objectFit: "cover",
                          borderRadius: "5px",
                          border: "1px solid lightgray"
                        }}
                      />
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: { xs: "2px", sm: 1, md: 2 }
                      }}
                    >
                      <Typography sx={{ fontWeight: 600, color: "#0068C9" }}>
                        {sentenceCase(productName || "")}
                      </Typography>
                      <Typography sx={{ color: "grey" }}>Variants Available</Typography>
                      <Typography sx={{ color: "#CC1414", fontWeight: 500 }}>
                        {minValue} - {maxValue} Miles
                      </Typography>
                    </Box>
                  </Box>

                  {/* Buttons */}

                  <Box
                    sx={{
                      display: "flex",
                      gap: { xs: "2px", sm: 1, md: 2 },
                      flexDirection: "column",
                      marginTop: { xs: "10px", sm: 1, md: "0px" }
                    }}
                  >
                    <LoadingButton
                      variant="outlined"
                      sx={{ width: { xs: "100%", sm: "100%", md: "150px" } }}
                      size={isMdScreen ? "small" : "medium"}
                      onClick={() => handleAddGiftCardToWishList(id)}
                    >
                      Move To Wishlist
                    </LoadingButton>

                    <LoadingButton
                      variant="contained"
                      sx={{ width: { xs: "100%", sm: "100%", md: "150px" } }}
                      size={isMdScreen ? "small" : "medium"}
                      onClick={() => {
                        navigate(`/gift-cards/${productCode}`);
                      }}
                    >
                      Buy Now
                    </LoadingButton>
                  </Box>
                </Box>
              );
            }
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100px"
          }}
        >
          {searchedGiftCards?.length === 0 && (
            <Typography sx={{ fontWeight: 600, textAlign: "center" }}>
              No results found.
            </Typography>
          )}
        </Box>
      </Box>
    </Dialog>
  );
};

export default SearchSuggestionsModal;
