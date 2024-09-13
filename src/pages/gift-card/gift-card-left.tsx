import { useState } from "react";

// mui icons
import OpenInFullIcon from "@mui/icons-material/OpenInFull";

// Slider
import ImageSlider from "@/components/slider/ImageSlider";

// MUI
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Typography,
  useMediaQuery
} from "@mui/material";

// interface
import { IGiftCard } from "@/interfaces/gift.interface";
import { theme } from "@/theme";
import { Close } from "@mui/icons-material";

type Props = {
  giftCardProduct: IGiftCard;
};

const GiftCardLeft: React.FC<Props> = ({ giftCardProduct }) => {
  const [open, setOpen] = useState<boolean>(false);
  const { productDescription, validityInMonths, giftCardType } = giftCardProduct;
  const [selectedImage, setSelectedImage] = useState<string>(
    `${import.meta.env.VITE_REACT_APP_CORE_ENGINE_URL}${giftCardProduct.productImageUris[0]}`
  );

  const isMdlScreen = useMediaQuery(theme.breakpoints.down("mdl"));

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <Grid item xs={isMdlScreen ? 12 : 3.7}>
      <Box
        sx={{
          width: isMdlScreen ? "98vw" : "100%",
          boxSizing: "border-box",
          border: "2px solid lightGray",
          borderRadius: "18px",
          padding: 4
        }}
      >
        {/* image Box */}
        <Box
          sx={{
            width: "100%",
            height: ""
          }}
        >
          <img
            src={selectedImage}
            alt="gift image"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "14px",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 1px 2px"
            }}
          />
        </Box>

        {giftCardProduct?.productImageUris?.length <= 1 && (
          <Box
            sx={{
              marginTop: 2,
              padding: 2,
              border: "2px solid white",
              borderRadius: "14px"
            }}
          ></Box>
        )}

        {/* Preview */}
        {giftCardProduct?.productImageUris?.length > 1 && (
          <Box
            sx={{
              marginTop: 2,
              padding: 2,
              border: "2px solid lightGray",
              borderRadius: "14px"
            }}
          >
            <ImageSlider
              images={
                giftCardProduct?.productImageUris?.map(
                  (image) => `${import.meta.env.VITE_REACT_APP_CORE_ENGINE_URL}${image}`
                ) || []
              }
              onImageClick={handleImageClick}
              selectedImage={selectedImage}
            />
          </Box>
        )}

        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography> Validity:</Typography>
            <Typography color={"#3464B3"}> {validityInMonths} Months</Typography>
          </Box>

          <Typography
            sx={{
              padding: "8px 15px",
              backgroundColor: theme.palette.action.active,
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: 500
            }}
          >
            {giftCardType}
          </Typography>
        </Box>

        {/* About the gift card */}
        <Box sx={{ bgcolor: "#F6F6F6", borderRadius: "14px", p: 2, marginTop: 3 }}>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Typography variant="h6">About this gift card</Typography>

            <IconButton
              aria-describedby={"simple-popover"}
              size="large"
              color="inherit"
              sx={{
                color: "text.secondary",
                backgroundColor: theme.palette.action.active,
                ":hover": {
                  backgroundColor: theme.palette.action.hover
                }
              }}
              onClick={() => setOpen(true)}
            >
              <OpenInFullIcon sx={{ fontSize: "14px" }} />
            </IconButton>
          </Box>

          <Box style={{ display: "flex", alignItems: "flex-end" }}>
            <Typography
              sx={{ marginTop: 1 }}
              variant="subtitle2"
              dangerouslySetInnerHTML={{ __html: productDescription }}
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "block"
              }}
            >
              {/* {description} */}
            </Typography>
            <Typography style={{ fontSize: "17px", marginLeft: "5px" }}>...</Typography>
          </Box>
        </Box>

        {giftCardProduct?.productImageUris?.length <= 1 && (
          <Box
            sx={{
              marginTop: 1,
              padding: 1,
              border: "2px solid white",
              borderRadius: "14px"
            }}
          ></Box>
        )}
      </Box>

      <Dialog
        maxWidth="xl"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        PaperProps={{ sx: { minHeight: "300px", minWidth: "400px" } }}
      >
        <Close
          sx={{ position: "absolute", right: 10, top: 10, cursor: "pointer" }}
          onClick={() => setOpen(false)}
        />

        <DialogTitle>
          <Typography variant="h5">About</Typography>
          <Divider />
        </DialogTitle>

        <DialogContent>
          <Typography
            variant="subtitle1"
            dangerouslySetInnerHTML={{ __html: productDescription }}
          ></Typography>
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default GiftCardLeft;
