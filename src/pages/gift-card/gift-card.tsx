import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// MUI
import { theme } from "@/theme";
import { Box, Grid, IconButton, Typography, useMediaQuery } from "@mui/material";

// mui icons
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";

// components
import GiftCardLeft from "./gift-card-left";
import GiftCardRight from "./gift-card-right";
import {
  getProductDetailsByProductCode
  // getProgramByProgramCode
} from "@/services/gift.service";
import { sentenceCase } from "change-case";
import { IGiftCard } from "@/interfaces/gift.interface";
import { useAppContext } from "@/context/appContext";

export const GiftCard = () => {
  const navigate = useNavigate();
  const { productCode } = useParams();

  const { programDetails, member } = useAppContext();

  const programMemberEmail = member?.email || "";

  const [cpp, setCpp] = useState<number>(0);
  const [programId, setProgramId] = useState<number>(1);
  const [giftCardData, setGiftCardData] = useState<IGiftCard>();

  const isMdlScreen = useMediaQuery(theme.breakpoints.down("mdl"));

  // const handleGetProgramByProgramCode = async () => {
  //   const response = await getProgramByProgramCode(programCode);
  //   setCpp(response?.costPerPoint);
  //   setProgramId(response?.id);
  // };

  const programImageUrl = programDetails?.programLogoUri
    ? import.meta.env.VITE_REACT_APP_CORE_ENGINE_URL + programDetails?.programLogoUri
    : "/assets/logo/loyyal-logo.svg";

  const getProductDetails = async () => {
    if (!productCode) return;
    const response = await getProductDetailsByProductCode(productCode);
    setGiftCardData(response);
  };

  useEffect(() => {
    if (programDetails && productCode) {
      setCpp(programDetails?.costPerPoint);
      setProgramId(programDetails?.id);
      getProductDetails();
    }
  }, [programDetails, productCode]);

  return (
    <Box sx={{ paddingX: isMdlScreen ? 1 : 8, paddingY: isMdlScreen ? 0 : 2, mb: 6 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          marginTop: 3,
          pl: isMdlScreen ? 2 : 0
        }}
      >
        <IconButton
          color="inherit"
          onClick={() => navigate(-1)}
          sx={{
            p: "10px",
            color: "text.secondary",
            backgroundColor: theme.palette.action.active,
            ":hover": {
              backgroundColor: theme.palette.action.hover,
              color: "text.secondary"
            }
          }}
        >
          <ArrowBackIosRoundedIcon sx={{ fontSize: "18px", pr: "2px" }} />
        </IconButton>

        <Box sx={{ width: "80px" }}>
          <img src={programImageUrl} width="100%" height={"100%"} />
        </Box>

        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {sentenceCase(giftCardData?.productName || "")}
        </Typography>
      </Box>

      {giftCardData && (
        <Grid
          container
          spacing={4}
          marginTop={2}
          direction={isMdlScreen ? "column" : "row"}
        >
          {/* Gift card left */}
          <GiftCardLeft giftCardProduct={giftCardData} />

          {/* Gift card Right */}
          <GiftCardRight
            giftCardProduct={giftCardData}
            cpp={cpp || 0.002}
            programId={programId}
            programMemberEmail={programMemberEmail}
          />
        </Grid>
      )}
    </Box>
  );
};
