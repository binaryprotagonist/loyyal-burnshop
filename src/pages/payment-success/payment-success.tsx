import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import { finalizeOrder, getGiftCardProducts } from "@/services/gift.service";
import { IGiftCardProduct } from "@/interfaces/gift.interface";
import { sentenceCase } from "change-case";
import { theme } from "@/theme";
import { useAppContext } from "@/context/appContext";
import { storageService } from "@/services";
import Loader from "@/components/loader/loader";

export const PaymentSuccess = () => {
  const { state } = useLocation();
  const [searchParams] = useSearchParams();
  const checkoutSessionId = searchParams.get("checkoutSessionId");
  const { setPoints } = useAppContext();

  const [loading, setLoading] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>(state?.orderId);
  const [giftCardProducts, setGiftCardProducts] = useState<IGiftCardProduct[]>([]);

  const getGiftCards = async () => {
    const payload = {
      redemptionMerchantId: null,
      pageNumber: 0,
      pageSize: 0,
      sortOrder: "desc",
      sortBy: "createdDate"
    };
    const response = await getGiftCardProducts(payload);
    setGiftCardProducts(response?.giftCardProductVOs?.slice(0, 5) || []);
  };

  useEffect(() => {
    getGiftCards();
  }, []);

  useEffect(() => {
    const handleFinalizeOrder = async () => {
      setLoading(true);
      const response = await finalizeOrder(checkoutSessionId as string);
      const { lineItems, points: redeemPoints } = response;
      const points = Number(storageService.getFromLocalStorage("points")) || 0;
      const calculatedPoints = points - redeemPoints;
      setPoints(calculatedPoints);
      storageService.setToLocalStorage("points", calculatedPoints);
      setOrderId(lineItems[0]?.orderId || "");
      setLoading(false);
    };

    if (checkoutSessionId) {
      handleFinalizeOrder();
    }
  }, [checkoutSessionId]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Box>
      <Box style={{ padding: "20px 50px" }}>
        {/* header */}

        <Box sx={{ display: "flex", justifyContent: "space-between" }}></Box>
        {/* </Grid> */}

        {/* img section */}
        <Grid
          style={{
            marginTop: "30px",
            position: "relative",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <img
            style={{ width: "100%" }}
            src="/assets/images/paymentSuccess/MaskGroup.png"
          />

          <Grid
            style={{
              position: "absolute",
              width: "60%",
              backgroundColor: "white",
              height: "70%",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <Box style={{}}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "5px",
                  alignItems: "center"
                }}
              >
                <Typography style={{ fontSize: "30px", fontWeight: "bold" }}>
                  Congratulations! Your order id is :
                </Typography>

                <Typography style={{ fontSize: "28px", fontWeight: "bold" }}>
                  {orderId && orderId}
                </Typography>
              </Box>

              <Typography style={{ marginTop: "15px", width: "80%", margin: "auto" }}>
                Your payment has been successfully completed. You will receive an email
                from the provider within 24 hours. Enjoy your Gift Card.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* gift card section */}

        <Grid style={{ marginTop: "40px", width: "100%", marginBottom: "20px" }}>
          <Typography style={{ fontSize: "25px", fontWeight: "bold" }}>
            Popular Gift Cards
          </Typography>

          <Grid
            style={{
              width: "100%",
              margin: "auto 0",
              marginTop: "20px",
              display: "flex",
              // justifyContent: "space-evenly",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "30px"
            }}
          >
            {giftCardProducts?.map((item, index) => {
              console.log(item.productImageUris[0]);
              return (
                <Box
                  key={index}
                  sx={{
                    width: "250px",
                    borderRadius: "14px",
                    padding: "10px",
                    bgcolor: theme.palette.background.default,
                    boxShadow: theme.shadows[1]
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      height: "150px",
                      borderRadius: "14px",
                      p: 1
                    }}
                  >
                    <img
                      src={
                        import.meta.env.VITE_REACT_APP_CORE_ENGINE_URL +
                        item?.productImageUris[0]
                      }
                      alt={item?.productName}
                      height={"100%"}
                      width={"100%"}
                      style={{ borderRadius: "14px" }}
                    />
                  </Box>

                  <Box sx={{ mt: 1, pl: 1 }}>
                    <Typography sx={{ fontWeight: "500", color: "#3464B3" }}>
                      {sentenceCase(item?.productName || "")}
                    </Typography>
                    <Typography sx={{ fontWeight: "500" }}>
                      {item?.minValue} - {item?.maxValue} Miles
                    </Typography>
                    <Typography sx={{ color: "lightgrey" }}>
                      Variants Available
                    </Typography>
                  </Box>
                </Box>
              );
            })}

            {/* ---- */}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
