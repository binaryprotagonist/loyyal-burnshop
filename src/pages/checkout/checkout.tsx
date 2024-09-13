import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// mui icons
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

// Mui
import {
  Badge,
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography
} from "@mui/material";

// Services
import { ICartItem } from "@/interfaces/cart.interface";
import { getShoppingCartItems } from "@/services/gift.service";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cartItemId = location?.state?.cartItemId;
  const productName = location?.state?.productName;
  const totalPoints = location?.state?.totalPoints;
  const programMemberId = location?.state?.programMemberId;

  const [open, setOpen] = useState<boolean>(false);
  const [cartItem, setCartItem] = useState<ICartItem>();
  const [shoppingCartItems, setShoppingCartItems] = useState<ICartItem[]>();

  const handleClose = () => setOpen(false);

  const getCartItems = async () => {
    const response = await getShoppingCartItems(programMemberId);
    setShoppingCartItems(response?.cartItems);

    if (cartItemId) {
      const item = response?.cartItems?.find((cart) => cart?.id === cartItemId);
      setCartItem(item);
    }
  };

  const handleConfirmClick = () => {
    navigate("/payment-success");
  };

  useEffect(() => {
    getCartItems();
  }, [cartItemId]);

  return (
    <Box sx={{ paddingX: 8, paddingY: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography style={{ fontSize: "30px", fontWeight: "bold" }}>ENOC</Typography>

        <Box
          sx={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}
        >
          <Badge badgeContent={shoppingCartItems?.length} color="primary">
            <ShoppingCartOutlinedIcon sx={{ fontSize: "22px" }} />
          </Badge>
          <Typography style={{ fontSize: "20px", fontWeight: "bold" }}>Cart</Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2, marginTop: 3 }}>
        <IconButton
          size="large"
          color="inherit"
          onClick={() => navigate(-1)}
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <ArrowBackIosIcon sx={{ fontSize: "14px", paddingLeft: "2px" }} />
        </IconButton>

        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Checkout
        </Typography>
      </Box>

      {/* GIFT */}
      <Grid
        style={{
          padding: "20px 20px",
          border: "1px solid rgba(0, 0, 0, 0.5)",
          borderRadius: "10px",
          marginTop: "20px",
          position: "relative"
        }}
      >
        <Grid display="flex" columnGap="80px">
          <Box
            style={{
              width: "350px",
              height: "183px",
              borderRadius: "10px",
              backgroundColor: "#C8E2EF"
            }}
          ></Box>
          <Box
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <Typography style={{ fontSize: "20px", fontWeight: "bold" }}>
              {productName}
            </Typography>
            <Grid
              style={{
                width: "100%",
                marginTop: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <Box>
                <Typography style={{ fontSize: "15px", fontWeight: "bold" }}>
                  Quantity: {cartItem?.quantity}
                </Typography>
              </Box>

              <Box>
                <Typography style={{ fontSize: "15px", fontWeight: "bold" }}>
                  Cash: {cartItem?.cashAmount}
                </Typography>
              </Box>
              <Box>
                <Typography style={{ fontSize: "15px", fontWeight: "bold" }}>
                  Points: {cartItem?.points}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 3
                }}
              >
                <Button
                  variant="contained"
                  sx={{ minWidth: "200px" }}
                  onClick={() => setOpen(true)}
                >
                  Proceed To Buy
                </Button>

                <Button
                  variant="outlined"
                  sx={{ minWidth: "200px" }}
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
              </Box>
            </Grid>
          </Box>
        </Grid>

        {/* ----------- */}
        <Box
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            cursor: "pointer"
          }}
        >
          <CloseIcon style={{ fontSize: "16px" }} />
        </Box>
      </Grid>

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
              value={"xyz@gmail.com"}
              sx={{
                "& input": {
                  padding: "11px 13px"
                }
              }}
            />
            {/* add */}
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
              >
                <AddIcon />
              </Box>
            </IconButton>
          </Box>

          {/* points */}
          <Box style={{ textAlign: "center" }}>
            <Box>
              <Typography style={{ fontSize: "30px", margin: "10px 0px" }}>
                {totalPoints} Points
              </Typography>
              <Typography style={{ fontSize: "14px" }}>
                will be deducted from your account
              </Typography>
            </Box>

            {cartItem?.points && !cartItem?.cashAmount ? (
              <Button
                style={{
                  backgroundColor: "#C8E2EF",
                  color: "black",
                  marginTop: "20px"
                }}
                variant="contained"
                onClick={handleConfirmClick}
              >
                confirm
              </Button>
            ) : !cartItem?.points && cartItem?.cashAmount ? (
              <Button
                style={{
                  backgroundColor: "#C8E2EF",
                  color: "black",
                  marginTop: "20px"
                }}
                variant="contained"
                onClick={handleConfirmClick}
              >
                Proceed for Cash Payment
              </Button>
            ) : (
              <Button
                style={{
                  backgroundColor: "#C8E2EF",
                  color: "black",
                  marginTop: "20px"
                }}
                variant="contained"
                onClick={handleConfirmClick}
              >
                Proceed for Cash Payment
              </Button>
            )}
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Checkout;
