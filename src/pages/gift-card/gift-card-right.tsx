import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Modal,
  Slider,
  TextField,
  Typography,
  useMediaQuery
} from "@mui/material";

import { LoadingButton } from "@mui/lab";

// mui icons
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";

// interfaces
import { IGiftCard } from "@/interfaces/gift.interface";
import { ChangeEvent } from "@/interfaces/common.interface";

// Services
import { createOrder } from "@/services/gift.service";

// components
import AmountTabs from "@/components/slider/AmountSlider";
import CustomSelect from "@/components/customs/custom-select/custom-select";
import { theme } from "@/theme";
import { storageService } from "@/services";
import { useAppContext } from "@/context/appContext";
import { Close } from "@mui/icons-material";

type Props = {
  cpp: number;
  programId: number;
  giftCardProduct: IGiftCard;
  programMemberEmail: string;
};

const PAYMENT_CURRENCY_OPTIONS = [
  { id: 1, label: "United State Dollar", value: "USD" },
  { id: 2, label: "EURO", value: "EUR" },
  { id: 3, label: "British Pound", value: "GBP" },
  { id: 4, label: "Indian Rupee", value: "INR" },
  { id: 5, label: "United Arab Emirates Dirham", value: "AED" },
  { id: 6, label: "Ethiopian Birr", value: "ETB" }
];

const GiftCardRight: React.FC<Props> = ({
  giftCardProduct,
  cpp,
  programId,
  programMemberEmail
}) => {
  const {
    id,
    howToUse,
    minValue,
    maxValue,
    currencyVO,
    termsAndConditions,
    denominationIncrement,
    loyyalCommissionPercentage
  } = giftCardProduct;
  const currencyId = currencyVO?.id;

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { member, points: yourPoints } = useAppContext();

  const [cash, setCash] = useState<number>(0);
  const [points, setPoints] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [emails, setEmails] = useState<string[]>([]);
  const [currency, setCurrency] = useState<string>();
  const [loading, setLoading] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [openTerms, setOpenTerms] = useState<boolean>(false);
  const [openHowToUse, setOpenHowToUse] = useState<boolean>(false);
  const [cartItemAmount, setCartItemAmount] = useState<string>("0");
  const [sliderValue, setSliderValue] = useState<number>(Number(cartItemAmount || 0));

  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isMdlScreen = useMediaQuery(theme.breakpoints.down("mdl"));

  // const totalPoints = Number(cartItemAmount) / cpp || 0;
  const totalPoints = Math.floor(Number(cartItemAmount) / cpp || 0);

  const length = Math.floor((maxValue - minValue) / denominationIncrement) + 1;
  const amounts = Array.from(
    { length: length },
    (_, i) => minValue + i * denominationIncrement
  );

  const handleClose = () => setOpen(false);

  const handleSelectQuantity = (event: ChangeEvent) => {
    setQuantity(Number(event.target.value));
  };

  const handleAmountChange = (e: ChangeEvent) => {
    setCartItemAmount(e.target.value);
  };

  const handleAmountClick = (amount: number) => {
    const sliderValue = amount;
    const points = Math.floor(Number(amount) / cpp);

    if (totalPoints >= points) {
      const cash = 0;
      setCash(cash);
      setPoints(Math.floor(points));
    } else {
      // const extraPoints = points - totalPoints;
      // cash = extraPoints * cpp;
      // sliderValue = Number(amount) - cash;
      // points = sliderValue / cpp;
      // cash = points
      setCash(cash);
      setPoints(Math.floor(points));
    }
    setSliderValue(sliderValue);
    setCartItemAmount(String(amount));
  };

  const handleSetCash = (e: ChangeEvent) => {
    const cashInput = Number(e.target.value);
    const amount = Number(cartItemAmount);

    if (cashInput > amount) {
      setCash(Math.floor(amount));
      setPoints(0);
      setSliderValue(0);
    } else {
      const remainingAmount = amount - cashInput;
      const calculatedPoints = Math.floor(remainingAmount / cpp);

      setPoints(Math.floor(calculatedPoints));
      setCash(cashInput);
      setSliderValue(remainingAmount);
    }
  };

  const quantityOptions = Array.from({ length: 9 }, (_, i) => ({
    value: i + 1,
    label: i + 1
  }));

  // const calculateCashAndPoints = (_: Event, value: number | number[]) => {
  //   value = Array.isArray(value) ? value[0] : value;
  //   if (totalPoints === points && value >= sliderValue) {
  //     setSliderValue(sliderValue);
  //   } else {
  //     const points = Math.floor(Number(value) / cpp);
  //     const neededPoints = totalPoints - points;
  //     let cash;

  //     if (neededPoints === totalPoints) {
  //       cash = Number(cartItemAmount);
  //     } else if (Number(cartItemAmount) >= sliderValue && totalPoints >= points) {
  //       cash = Number(cartItemAmount) - sliderValue - 1;
  //     } else {
  //       cash = neededPoints * cpp;
  //     }

  //     setCash(cash);
  //     setPoints(points);
  //     setSliderValue(Number(value));
  //   }
  // };
  const calculateCashAndPoints = (_: Event, value: number | number[]) => {
    const numericValue = Array.isArray(value) ? value[0] : value;

    if (totalPoints === points && numericValue >= sliderValue) {
      setSliderValue(sliderValue);
      return;
    }

    const newPoints = Number(numericValue) / cpp;
    const neededPoints = totalPoints - newPoints;
    let cash;

    if (neededPoints >= 0) {
      if (neededPoints === totalPoints) {
        cash = Number(cartItemAmount);
      } else if (Number(cartItemAmount) >= numericValue && totalPoints >= newPoints) {
        cash = Number(cartItemAmount) - numericValue;
      } else {
        cash = neededPoints * cpp;
      }
    } else {
      cash = 0;
    }

    setCash(Math.max(cash, 0));
    setPoints(Math.floor(newPoints));
    setSliderValue(Number(numericValue));
  };

  const handleBuyNowClick = async () => {
    if (yourPoints < points) {
      enqueueSnackbar(
        "Insufficient points, Points should be greater than or equal to your miles!",
        { variant: "error" }
      );
      return;
    }

    const order = {
      programMemberId: member!.memberId || "",
      programMemberEmails: [programMemberEmail, ...emails],
      programVO: { id: programId },
      cashAmount: cash,
      currencyVO: { id: currencyId },
      points: points,
      loyyalCommissionAmount: loyyalCommissionPercentage,
      orderAmount: Number(cartItemAmount),
      orderStatus: "CREATED",
      lineItems: [
        {
          giftCardProductVO: { id },
          orderItemAmount: Number(cartItemAmount),
          orderItemStatus: "CREATED",
          cashAmount: cash,
          currencyVO: { id: currencyId },
          points: points,
          loyyalCommissionAmount: loyyalCommissionPercentage
        }
      ]
    };
    try {
      setLoading("buyNow");
      const response = await createOrder(order);

      if (response?.burnShopBearer) {
        storageService.setToLocalStorage("burnShopBearer", response?.burnShopBearer);
      }

      if (response.paymentUrl) {
        window.location.href = response.paymentUrl;
      } else {
        navigate("/payment-success", {
          state: { orderId: response?.lineItems[0]?.orderId }
        });
      }
    } catch (error: any) {
      console.log(error);
      enqueueSnackbar("Something went wrong", { variant: "error" });
    } finally {
      setLoading("");
    }
  };

  const handleAddEmail = () => {
    setEmails([...emails, ""]);
  };

  const handleRemoveEmail = (index: number) => {
    const newEmails = [...emails];
    newEmails.splice(index, 1);
    setEmails(newEmails);
  };

  const handleEmailChange = (value: string, index: number) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  useEffect(() => {
    const currency = PAYMENT_CURRENCY_OPTIONS?.find(({ id }) => id === currencyId)?.value;
    setCurrency(currency);
  }, [currencyId]);

  return (
    <Grid item xs={isMdlScreen ? 12 : 8.3}>
      <Box width={isMdlScreen ? "98vw" : "100%"}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Gift Card Details</Typography>
          <Typography>
            {currency} {minValue} - {currency} {maxValue}
          </Typography>
        </Box>

        <Box sx={{ width: "100%", marginBottom: 6 }}>
          <Grid container marginTop={2} justifyContent={"space-between"}>
            <Grid
              item
              xs={8.7}
              sx={{
                width: "100%",
                borderRadius: "14px",
                border: "2px solid lightGray",
                padding: "15px"
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 2
                }}
              >
                <TextField
                  disabled={Boolean(denominationIncrement)}
                  size="small"
                  placeholder="Select Amount"
                  value={cartItemAmount}
                  onChange={handleAmountChange}
                  sx={{
                    width: "150px"
                  }}
                />

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1
                  }}
                >
                  <Typography>Quantity:</Typography>
                  <CustomSelect
                    name="quantity"
                    options={quantityOptions}
                    size="small"
                    value={quantity}
                    onChange={handleSelectQuantity}
                    placeholder="Choose..."
                    disabled={false}
                  />
                </Box>
              </Box>

              {/*---------- Amount tabs --------*/}
              <AmountTabs
                amounts={amounts}
                currency={currency}
                selectedAmount={cartItemAmount}
                onAmountClick={handleAmountClick}
              />
            </Grid>

            {/* Total Points */}
            <Grid
              item
              xs={3}
              sx={{
                width: "100%",
                minHeight: "100%",
                borderRadius: "14px",
                border: "2px solid lightGray",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center"
              }}
            >
              <Box>
                <Typography>Total Points</Typography>
                <Typography variant="subtitle2">{totalPoints}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* ----------- calculate points---------------- */}
        <Box>
          <Typography variant="h6">Calculate Points/Cash</Typography>

          <Box
            sx={{
              marginTop: 3,
              borderRadius: "14px",
              border: "2px solid lightGray",
              padding: "15px"
            }}
          >
            <Box sx={{ width: "100%", marginBottom: 1 }}>
              <Slider
                size="small"
                min={0}
                value={sliderValue}
                max={Number(cartItemAmount)}
                aria-label="Small"
                valueLabelDisplay="auto"
                onChange={calculateCashAndPoints}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: isMdScreen ? "column" : "row",
                gap: isMdScreen ? 2 : 0
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 1
                }}
              >
                <Typography variant="h6">Cash</Typography>
                <TextField
                  type="string"
                  placeholder="3460"
                  size="small"
                  value={cash}
                  disabled={cartItemAmount === "0"}
                  onChange={handleSetCash}
                  sx={{ width: "200px" }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 1
                }}
              >
                <Typography variant="h6">Points</Typography>
                <TextField
                  placeholder="45565"
                  size="small"
                  InputProps={{
                    readOnly: true
                  }}
                  value={points}
                  sx={{ width: "200px" }}
                />
              </Box>
            </Box>
          </Box>
        </Box>

        {/* ----------- Terms-Conditions And How to use ---------------- */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            gap: "15px",
            marginTop: 6
          }}
        >
          <GiftCardDetails
            open={openTerms}
            setOpen={setOpenTerms}
            heading={"Terms & Conditions"}
            description={termsAndConditions}
            bgcolor={true}
          />
          <GiftCardDetails
            open={openHowToUse}
            setOpen={setOpenHowToUse}
            heading={"How To Use"}
            description={howToUse}
            bgcolor={true}
          />
        </Box>

        {/* ----------- Buy Now Button ---------------- */}

        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <LoadingButton
            disabled={cartItemAmount === "0"}
            variant="contained"
            sx={{ minWidth: "50%", marginTop: 6 }}
            onClick={() => {
              if (localStorage.getItem("jwtToken")) {
                if (points > totalPoints) {
                  enqueueSnackbar("Points should be less than total points!", {
                    variant: "warning"
                  });
                  return;
                }
                setOpen(true);
              } else {
                navigate("/login");
              }
            }}
          >
            Buy Now
          </LoadingButton>
        </Box>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: "10px",
            p: 8
          }}
        >
          {/* email */}
          <Box style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Typography>Receiver’s Email</Typography>
            <TextField
              disabled
              value={programMemberEmail}
              sx={{
                "& input": {
                  padding: "11px 13px"
                }
              }}
            />
            {/* add */}

            <IconButton onClick={handleAddEmail}>
              <Box
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <AddIcon sx={{ color: "gray" }} />
              </Box>
            </IconButton>
          </Box>

          <Box
            sx={{
              width: "100%"
            }}
          >
            {emails?.map((email, index) => (
              <Box
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginTop: "10px"
                }}
              >
                <Typography>Receiver’s Email</Typography>
                <TextField
                  value={email}
                  placeholder="Enter Email"
                  sx={{
                    "& input": {
                      padding: "11px 13px"
                    }
                  }}
                  onChange={(e) => handleEmailChange(e.target.value, index)}
                />

                <IconButton>
                  <Box
                    style={{
                      width: "50px",
                      height: "50px",
                      backgroundColor: "rgba(0, 0, 0, 0.1)",
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                    onClick={() => handleRemoveEmail(index)}
                  >
                    <RemoveIcon sx={{ color: "gray" }} />
                  </Box>
                </IconButton>
              </Box>
            ))}
          </Box>

          {/* points */}
          <Box style={{ textAlign: "center" }}>
            <Box>
              <Typography style={{ fontSize: "30px", margin: "10px 0px" }}>
                {points} Points
              </Typography>
              <Typography style={{ fontSize: "14px" }}>
                will be deducted from your account
              </Typography>
            </Box>

            {points && !cash ? (
              <LoadingButton
                loading={loading === "buyNow"}
                style={{
                  marginTop: "20px"
                }}
                variant="contained"
                onClick={handleBuyNowClick}
              >
                Confirm
              </LoadingButton>
            ) : !points && cash ? (
              <LoadingButton
                loading={loading === "buyNow"}
                style={{
                  marginTop: "20px"
                }}
                variant="contained"
                onClick={handleBuyNowClick}
              >
                Proceed for Cash Payment
              </LoadingButton>
            ) : (
              <LoadingButton
                loading={loading === "buyNow"}
                style={{
                  marginTop: "20px"
                }}
                variant="contained"
                onClick={handleBuyNowClick}
              >
                Proceed for Cash Payment
              </LoadingButton>
            )}
          </Box>
        </Box>
      </Modal>
    </Grid>
  );
};

export default GiftCardRight;

type GiftCardProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  heading: string;
  description: string;
  border?: boolean;
  bgcolor?: boolean;
  width?: string;
};

export const GiftCardDetails: React.FC<GiftCardProps> = ({
  open,
  setOpen,
  heading,
  description,
  border = false,
  bgcolor = false,
  width
}) => {
  const handleDialogOpen = () => {
    setOpen(true);
  };

  return (
    <Box
      sx={{
        borderRadius: "14px",
        border: border ? "2px solid lightGray" : "",
        padding: "15px",
        width: width ? width : "50%",
        bgcolor: bgcolor ? "#F6F6F6" : "transparent"
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Typography variant="h6">{heading}</Typography>

        <IconButton
          size="large"
          color="inherit"
          sx={{
            color: "text.secondary",
            backgroundColor: theme.palette.action.active,
            ":hover": {
              backgroundColor: theme.palette.action.hover
            }
          }}
          onClick={handleDialogOpen}
        >
          <OpenInFullIcon sx={{ fontSize: "14px" }} />
        </IconButton>
      </Box>

      {/* <Box style={{ width: "100%", display: "flex", alignItems: "flex-end" }}> */}
      <Box style={{ display: "flex", alignItems: "flex-end" }}>
        <Typography
          sx={{ marginTop: 1 }}
          variant="subtitle2"
          dangerouslySetInnerHTML={{ __html: description }}
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            // width: "60%",
            display: "block"
          }}
        >
          {/* {description} */}
        </Typography>
        <Typography style={{ fontSize: "17px", marginLeft: "5px" }}>...</Typography>
      </Box>
      {/* <Typography style={{ fontSize: "17px", marginLeft: "5px" }}>...</Typography> */}
      {/* </Box> */}

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        sx={{}}
        PaperProps={{ sx: { minHeight: "300px", minWidth: "400px" } }}
      >
        <Close
          sx={{ position: "absolute", right: 10, top: 10, cursor: "pointer" }}
          onClick={() => setOpen(false)}
        />

        <DialogTitle>
          <Typography variant="h5">{heading}</Typography>
          <Divider />
        </DialogTitle>

        <DialogContent>
          <Typography
            variant="subtitle1"
            dangerouslySetInnerHTML={{ __html: description }}
          ></Typography>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
