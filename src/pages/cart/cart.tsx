import {
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //   width: 400,
  bgcolor: "background.paper",

  boxShadow: 24,
  borderRadius: "10px",
  //   p: 8
  p: 8
};

export const Cart = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [cash, setCash] = useState(0);
  const [points, setPoints] = useState(0);

  const [shoppingCartItems, setShoppingCartItems] = useState({
    id: 0,
    programMemberId: "",
    programId: 0,
    totalAmount: 0,
    totalAmountCurrencyId: 0,
    cashAmount: 0,
    points: 0,
    createdDate: null,
    lastUpdatedDate: null,
    cartItems: [
      {
        id: 13,
        shoppingCartId: 9,
        giftCardProductId: 1,
        giftCardValue: 50,
        giftCardCurrencyId: 5,
        cashAmount: 25.0,
        points: 100,
        quantity: 2,
        cartItemAmount: 50.0,
        amountCurrencyId: 5,
        createdDate: null,
        lastUpdatedDate: null
      }
    ]
  });

  //   const [apiRes, setApiRes] = useState({
  //     id: 0,
  //     programMemberId: "",
  //     programId: 0,
  //     totalAmount: 0,
  //     totalAmountCurrencyId: 0,
  //     cashAmount: 0,
  //     points: 0,
  //     createdDate: null,
  //     lastUpdatedDate: null,
  //     cartItems: []
  //   });

  //   console.log("process.env.REACT_APP_PARTNERHUB_SELF_SERVICE_URL", process);
  //   let url = `${process.env.REACT_APP_CORE_ENGINE_URL}/something`;
  //   https://core-engine.dev.loyyal.net

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    // console.log(decodedJwt, 'decodedJwt###########');
    // urlJwtToken

    const config = {
      method: "get",
      url: `https://core-engine.dev.loyyal.net/shoppingCart/getShoppingCartItems`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTM5NDkyODAsImlzcyI6ImNvcmUtZW5naW5lLXNlcnZpY2UiLCJzdWIiOiJhYW1pci5tb2hkQGxveXlhbC5jb20iLCJhdWQiOlsiY29yZS1lbmdpbmUtc2VydmljZSIsImNvbnRyYWN0LW1hbmFnZW1lbnQtc2VydmljZSIsImFsbC1sb3l5YWwtZnJvbnRlbmRzIl0sImF1dGhvcml6ZWQiOnRydWUsIm5hbWUiOiJBYW1pciIsInVzZXJuYW1lIjoiYWFtaXIubW9oZEBsb3l5YWwuY29tIiwicm9sZUNvZGUiOiJMT1lZQUxfQURNSU4iLCJleHAiOjE3NDU0ODUyODB9.aj-3WFSQt4SBn_lbnmPCnZ2LZ2gkh36NId9ZmN2H9shNOJnZHR-PKfNhFsShpwaj2vskMNv7e8-nWtSPeQRya1Jfyt6NMjNspIU_l1wkgrTgmTiH3eWHDNyasqzaQHMAYBJao0zly14_BXgujSQ3lH4w8lN-Kew9YrtrifkPnbjk2P8ex_4QuOkx6Qjwt76o5_DKY1jp_0r6t6ylrz0TrLAUXywSilfQxWzllj1khIlX8vmeLO0l35cRkqXannzFZtSwaQuVEQAD7tye9s4IuOuAgyimnze3WZsQtQu1De26vtWbhzFXiJGBBYOM9N4e_13fNM4d3PGRRJBobhwUlg`,
        type: "text"
      },
      params: {
        programMemberId: 123
        //   namespace: `${decodedJwt.programCode}.rules.points_earn_contract.pricing_strategy`,
      }
    };

    axios(config)
      .then(function (response) {
        console.log(response, "response");
        setShoppingCartItems(response.data);
      })
      .catch(function (error) {
        console.log(error, "error");
      });
  };

  useEffect(() => {
    if (shoppingCartItems?.cartItems.length > 0) {
      const totalCash = shoppingCartItems?.cartItems.reduce(
        (accumulator, currentValue) => {
          return accumulator + currentValue.cashAmount * currentValue.quantity;
        },
        0
      );

      const totalPoints = shoppingCartItems?.cartItems.reduce(
        (accumulator, currentValue) => {
          return accumulator + currentValue.points * currentValue.quantity;
        },
        0
      );

      console.log(totalPoints, "totalPoints");
      setCash(totalCash);
      setPoints(totalPoints);
    }
  }, [shoppingCartItems]);

  console.log(shoppingCartItems, "shoppingCartItems==========");

  return (
    <Box style={{ width: "100%" }}>
      <Box style={{ padding: "50px" }}>
        {/* header */}
        {/* <Grid fullWidth style={{}}> */}
        <Grid display="flex" justifyContent="space-between">
          <Grid alignItems="center">
            <Typography style={{ fontSize: "30px", fontWeight: "bold" }}>ENOC</Typography>
          </Grid>

          <Grid display="flex" alignItems="center">
            <ShoppingCartIcon />

            <Typography
              style={{ fontSize: "20px", fontWeight: "bold", marginLeft: "7px" }}
            >
              Cart
            </Typography>
          </Grid>
        </Grid>
        {/* </Grid> */}

        {/* back--checkout--cart */}

        <Grid style={{ marginTop: "20px", display: "flex", alignItems: "center" }}>
          <Box
            style={{
              width: "35px",
              height: "35px",
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50%",
              marginRight: "10px"
            }}
          >
            <ArrowBackIosNewIcon style={{ fontSize: "12px" }} />
          </Box>

          <Box>
            <Typography style={{ fontSize: "25px", fontWeight: 600 }}>Cart</Typography>
          </Box>
        </Grid>

        {/* payment info and gift card sec */}

        <Box></Box>
        {shoppingCartItems?.cartItems?.length > 1 ? (
          <Grid style={{ marginTop: "20px" }}>
            <Grid
              style={{
                padding: "40px 15px",
                border: "1px solid rgba(0, 0, 0, 0.5)",
                borderRadius: "10px"
              }}
            >
              <Typography style={{ fontSize: "18px", fontWeight: 600 }}>
                Payment Information
              </Typography>

              <Grid
                style={{
                  marginTop: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <Typography style={{ fontSize: "15px", fontWeight: "bold" }}>
                  No Of Cards: {shoppingCartItems?.cartItems?.length}
                </Typography>
                <Typography style={{ fontSize: "15px", fontWeight: "bold" }}>
                  Total Points: {points}
                </Typography>
                <Typography style={{ fontSize: "15px", fontWeight: "bold" }}>
                  Total Cash: {cash}
                </Typography>
                <Grid style={{ width: "35%" }}>
                  <Button
                    onClick={() => {
                      console.log("button clicked");
                      handleOpen();
                    }}
                    style={{ backgroundColor: "#C8E2EF", color: "black", width: "48%" }}
                    variant="contained"
                  >
                    Proceed To Buy
                  </Button>
                  {/* --------------------------------- */}
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
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
                        {points && (
                          <Box>
                            <Typography style={{ fontSize: "30px", margin: "10px 0px" }}>
                              {points} Points
                            </Typography>
                            <Typography style={{ fontSize: "14px" }}>
                              will be deducted from your account
                            </Typography>
                          </Box>
                        )}

                        {points && !cash ? (
                          <Button
                            style={{
                              backgroundColor: "#C8E2EF",
                              color: "black",
                              marginTop: "20px"
                            }}
                            variant="contained"
                          >
                            confirm
                          </Button>
                        ) : !points && cash ? (
                          <Button
                            style={{
                              backgroundColor: "#C8E2EF",
                              color: "black",
                              marginTop: "20px"
                            }}
                            variant="contained"
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
                          >
                            Proceed for Cash Payment
                          </Button>
                        )}
                      </Box>
                    </Box>
                  </Modal>
                  {/* --------------------------------- */}

                  <Button
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.1)",
                      color: "black",
                      width: "48%",
                      marginLeft: "10px"
                    }}
                    variant="contained"
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            {/* gift card items */}
            {shoppingCartItems.cartItems.map((item, index) => {
              return (
                <Grid
                  key={index}
                  style={{
                    padding: "20px 20px",
                    border: "1px solid rgba(0, 0, 0, 0.5)",
                    borderRadius: "10px",
                    marginTop: "20px",
                    position: "relative"
                  }}
                >
                  <Grid display="flex" columnGap="30px">
                    <Box
                      style={{
                        width: "254px",
                        height: "183px",

                        borderRadius: "10px",
                        backgroundColor: "#C8E2EF"
                      }}
                    ></Box>
                    <Box
                      style={{
                        width: "50%",

                        flexDirection: "column",
                        display: "flex",
                        justifyContent: "center"
                      }}
                    >
                      <Typography style={{ fontSize: "20px", fontWeight: "bold" }}>
                        Gift Card Name
                      </Typography>
                      <Grid
                        style={{
                          marginTop: "10px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center"
                        }}
                      >
                        <Typography style={{ fontSize: "15px", fontWeight: "bold" }}>
                          Quantity: {item.quantity}
                        </Typography>
                        <Typography style={{ fontSize: "15px", fontWeight: "bold" }}>
                          Cash: {item.cashAmount}
                        </Typography>
                        <Typography style={{ fontSize: "15px", fontWeight: "bold" }}>
                          Points: {item.points}
                        </Typography>
                      </Grid>
                    </Box>
                  </Grid>

                  {/* ----------- */}
                  <Box
                    style={{
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      cursor: "pointer"
                    }}
                  >
                    <CloseIcon style={{ fontSize: "15px" }} />
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <Box>
            {" "}
            {shoppingCartItems.cartItems.map((item, index) => {
              return (
                <Grid
                  key={index}
                  style={{
                    padding: "20px 20px",
                    border: "1px solid rgba(0, 0, 0, 0.5)",
                    borderRadius: "10px",
                    marginTop: "20px",
                    position: "relative"
                  }}
                >
                  <Grid display="flex" columnGap="30px">
                    <Box
                      style={{
                        width: "254px",
                        height: "183px",

                        borderRadius: "10px",
                        backgroundColor: "#C8E2EF"
                      }}
                    ></Box>
                    <Box
                      style={{
                        width: "100%",

                        flexDirection: "column",
                        display: "flex",
                        justifyContent: "center"
                      }}
                    >
                      <Typography style={{ fontSize: "20px", fontWeight: "bold" }}>
                        Gift Card Name
                      </Typography>
                      <Grid
                        style={{
                          marginTop: "10px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center"
                        }}
                      >
                        <Typography style={{ fontSize: "15px", fontWeight: "bold" }}>
                          Quantity: {item.quantity}
                        </Typography>
                        <Typography style={{ fontSize: "15px", fontWeight: "bold" }}>
                          Cash: {item.cashAmount}
                        </Typography>
                        <Typography style={{ fontSize: "15px", fontWeight: "bold" }}>
                          Points: {item.points}
                        </Typography>
                        <Grid style={{ display: "flex" }}>
                          <Button
                            onClick={() => {
                              console.log("button clicked");
                              handleOpen();
                            }}
                            style={{
                              backgroundColor: "#C8E2EF",
                              color: "black",
                              //   width: "48%"
                              height: "50px",
                              width: "200px"
                            }}
                            variant="contained"
                          >
                            Proceed To Buy
                          </Button>
                          {/* --------------------------------- */}
                          <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box sx={style}>
                              {/* email */}
                              <Box
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "10px"
                                }}
                              >
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
                                {points && (
                                  <Box>
                                    <Typography
                                      style={{ fontSize: "30px", margin: "10px 0px" }}
                                    >
                                      {points} Points
                                    </Typography>
                                    <Typography style={{ fontSize: "14px" }}>
                                      will be deducted from your account
                                    </Typography>
                                  </Box>
                                )}

                                {points && !cash ? (
                                  <Button
                                    style={{
                                      backgroundColor: "#C8E2EF",
                                      color: "black",
                                      marginTop: "20px"
                                    }}
                                    variant="contained"
                                  >
                                    confirm
                                  </Button>
                                ) : !points && cash ? (
                                  <Button
                                    style={{
                                      backgroundColor: "#C8E2EF",
                                      color: "black",
                                      marginTop: "20px"
                                    }}
                                    variant="contained"
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
                                  >
                                    Proceed for Cash Payment
                                  </Button>
                                )}
                              </Box>
                            </Box>
                          </Modal>
                          {/* --------------------------------- */}

                          <Button
                            style={{
                              backgroundColor: "rgba(0, 0, 0, 0.1)",
                              color: "black",
                              //   width: "48%",
                              marginLeft: "10px",
                              height: "50px",
                              width: "200px"
                            }}
                            variant="contained"
                          >
                            Cancel
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>

                  {/* ----------- */}
                  <Box
                    style={{
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      cursor: "pointer"
                    }}
                  >
                    <CloseIcon style={{ fontSize: "15px" }} />
                  </Box>
                </Grid>
              );
            })}
          </Box>
        )}
      </Box>
    </Box>
  );
};
