import { FC, useState } from "react";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { Order } from "@/interfaces/gift.interface";
import { fDate } from "@/utils/formatDate";
import { theme } from "@/theme";
import { GiftCardDetails } from "@/pages/gift-card/gift-card-right";
import giftCardImage from "@/assets/wishlist/giftcard2.png";

interface IPurchasedGiftCards {
  purchasedGifts: Order[];
}

export const PurchasedGiftCards: FC<IPurchasedGiftCards> = ({ purchasedGifts }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2
      }}
    >
      {purchasedGifts?.map((gift) => <GiftCard key={gift?.id} gift={gift} />)}

      {purchasedGifts?.length === 0 && <NoGiftCard />}
    </Box>
  );
};

interface IGiftCard {
  gift: Order;
}

const GiftCard: FC<IGiftCard> = ({ gift }) => {
  const [showGiftDetails, setShowGiftDetails] = useState<boolean>(false);
  const [openHowToUse, setOpenHowToUse] = useState<boolean>(false);
  const [openAboutThisGiftCard, setOpenAboutThisGiftCard] = useState<boolean>(false);
  const [openTermsAndConditions, setOpenTermsAndConditions] = useState<boolean>(false);

  const howToUse = gift?.lineItems[0]?.giftCardProductVO?.howToUse;
  const aboutThisGiftCard = gift?.lineItems[0]?.giftCardProductVO?.productDescription;
  const termsAndConditions = gift?.lineItems[0]?.giftCardProductVO?.termsAndConditions;

  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        // width: "400px",
        border: "2px solid lightgray",
        borderRadius: "10px",
        p: 2,
        display: "flex",
        gap: 2
      }}
    >
      {/* Card Image */}
      <Box sx={{ width: "50%", height: isMdScreen ? "100%" : "220px" }}>
        <img src={giftCardImage} alt="gift card image" width={"100%"} height={"100%"} />
      </Box>

      {/* Card Details */}
      <Box
        sx={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 1
        }}
      >
        <Typography sx={{ fontWeight: 500, fontSize: "16px" }}>
          {gift?.lineItems[0]?.giftCardProductVO?.productName}
        </Typography>

        <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
          Quantity : {gift?.lineItems[0]?.orderItemQuantity}
        </Typography>

        <Typography sx={{ fontWeight: 500, fontSize: "18px" }}>
          {gift?.lineItems[0]?.points} Miles
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: "2px" }}>
          <Typography sx={{ fontSize: "14px", color: "grey" }}>
            Purchased Date :
          </Typography>
          <Typography sx={{ fontSize: "14px" }}>
            {fDate(gift?.lineItems[0]?.createdDate || "")}
          </Typography>
        </Box>
        {!showGiftDetails && (
          <Box sx={{ display: "flex", alignItems: "center", gap: "2px" }}>
            <Typography sx={{ fontSize: "14px", color: "grey" }}>Validity :</Typography>
            <Typography sx={{ fontSize: "14px" }}>
              {gift?.lineItems[0]?.giftCardProductVO?.validityInMonths} Months
            </Typography>
          </Box>
        )}

        {showGiftDetails && (
          <Box sx={{ my: 1 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2
              }}
            >
              <Box
                sx={{
                  // width: "100%",
                  display: "flex",
                  gap: 1
                }}
              >
                <Typography fontWeight={500}> Validity:</Typography>
                <Typography color={"#3464B3"}>
                  {gift?.lineItems[0]?.giftCardProductVO?.validityInMonths} Months
                </Typography>
              </Box>

              <Typography
                sx={{
                  padding: "8px 15px",
                  backgroundColor: theme.palette.action.active,
                  borderRadius: "12px",
                  fontSize: "12px",
                  fontWeight: 500
                }}
              >
                {gift?.lineItems[0]?.giftCardProductVO?.giftCardType}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1, my: 1 }}>
              <GiftCardDetails
                open={openAboutThisGiftCard}
                setOpen={setOpenAboutThisGiftCard}
                heading={"About This Gift Card"}
                description={aboutThisGiftCard}
                bgcolor={true}
                width="100%"
              />

              <GiftCardDetails
                open={openTermsAndConditions}
                setOpen={setOpenTermsAndConditions}
                heading={"Terms And Conditions"}
                description={termsAndConditions}
                bgcolor={true}
                width="100%"
              />

              <GiftCardDetails
                open={openHowToUse}
                setOpen={setOpenHowToUse}
                heading={"How To Use"}
                description={howToUse}
                bgcolor={true}
                width="100%"
              />
            </Box>
          </Box>
        )}

        <Button
          variant="outlined"
          fullWidth
          size="small"
          onClick={() => setShowGiftDetails(!showGiftDetails)}
        >
          {showGiftDetails ? "Hide Details" : "See Full Details"}
        </Button>
      </Box>
    </Box>
  );
};

const NoGiftCard = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 2
      }}
    >
      <Typography sx={{ fontWeight: 500, fontSize: "16px" }}>
        No Purchased Gift Cards
      </Typography>
    </Box>
  );
};
