import { useEffect, useState } from "react";
import { storageService } from "@/services";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/appContext";
import { Box, Button, IconButton, Stack, Typography, useMediaQuery } from "@mui/material";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";

// Mui icons
import LocalAtmRoundedIcon from "@mui/icons-material/LocalAtmRounded";
import PermIdentityRoundedIcon from "@mui/icons-material/PermIdentityRounded";

// Images
import miles from "../../assets/home/miles.png";

// Components
import { ProfileInformation } from "@/components/profile/profile-information";
import { PurchasedGiftCards } from "@/components/profile/purchased-gift-cards";
import { getOrders } from "@/services/gift.service";
import { Order } from "@/interfaces/gift.interface";
import { theme } from "@/theme";

const Profile = () => {
  const navigate = useNavigate();
  const { points, setMember, member, setWishlistItems } = useAppContext();

  const [selectedTab, setSelectedTab] = useState("Profile");
  const [purchasedGifts, setPurchasedGifts] = useState<Order[]>([]);

  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));

  const isProfileSelected = selectedTab === "Profile";
  const isGiftCardsSelected = selectedTab === "GiftCards";

  const handleLogout = () => {
    storageService.removeFromLocalStorage("jwtToken");
    storageService.removeFromLocalStorage("member");
    setMember(null);
    setWishlistItems([]);
    navigate("/login");
  };

  const getPurchasedGiftCards = async () => {
    if (!member?.memberId) return;
    const response = await getOrders({
      pageNumber: 0,
      pageSize: 5,
      programMemberId: member?.memberId
    });

    setPurchasedGifts(response?.orderVOS || []);
  };

  useEffect(() => {
    getPurchasedGiftCards();
  }, [member?.memberId]);

  return (
    <Box p={isMdScreen ? 4 : 10}>
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <IconButton
          sx={{ bgcolor: " #EBEBEB", color: "black", ":hover": { bgcolor: "#EBEBEB" } }}
          onClick={() => navigate("/")}
        >
          <ArrowBackIosRoundedIcon fontSize="small" sx={{ pr: "2px" }} />
        </IconButton>

        <Typography variant="h5">Account Details</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 4,
          justifyContent: "center",
          alignItems: "flex-start",
          flexDirection: isMdScreen ? "column-reverse" : "row",
          mt: 2
        }}
      >
        {/* Profile Information & Purchased Gift Cards */}
        <Box style={{ width: isMdScreen ? "100%" : "70%" }}>
          {isProfileSelected && <ProfileInformation />}
          {isGiftCardsSelected && <PurchasedGiftCards purchasedGifts={purchasedGifts} />}
        </Box>

        {/* Miles and Logout */}
        <Box
          style={{
            width: isMdScreen ? "100%" : "30%",
            display: "flex",
            justifyContent: "center"
          }}
        >
          <Box
            sx={{
              width: isMdScreen ? "100%" : "300px",
              border: "2px solid lightgray",
              borderRadius: "10px",
              p: 4
            }}
          >
            {/* Miles */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "center",
                alignItems: "center",
                mb: 3
              }}
            >
              <Box sx={{ width: "50px" }}>
                <img src={miles} alt="coin image" width={"100%"} height={"100%"} />
              </Box>

              <Box>
                <Typography color={"gray"}>Total Miles</Typography>
                <Typography sx={{ fontWeight: 500, fontSize: "18px" }}>
                  {points}
                </Typography>
              </Box>
            </Box>

            {/* Profile Tabs */}
            <Stack sx={{ gap: "10px" }}>
              <Stack
                direction={"row"}
                sx={{
                  padding: "8px 12px",
                  gap: 1,
                  border: "1px solid grey",
                  borderRadius: "10px",
                  cursor: "pointer",
                  bgcolor: isProfileSelected ? "black" : "transparent",
                  color: isProfileSelected ? "white" : "black"
                }}
                onClick={() => setSelectedTab("Profile")}
              >
                <PermIdentityRoundedIcon />
                <Typography>Profile Information</Typography>
              </Stack>
              <Stack
                direction={"row"}
                sx={{
                  padding: "8px 12px",
                  gap: 1,
                  border: "1px solid grey",
                  borderRadius: "10px",
                  cursor: "pointer",
                  bgcolor: isGiftCardsSelected ? "black" : "transparent",
                  color: isGiftCardsSelected ? "white" : "black"
                }}
                onClick={() => setSelectedTab("GiftCards")}
              >
                <LocalAtmRoundedIcon />
                <Typography>Purchased Gift Cards</Typography>
              </Stack>
            </Stack>

            <Box sx={{ mt: 2, width: "100%", display: "flex", justifyContent: "center" }}>
              <Button
                variant="outlined"
                onClick={handleLogout}
                sx={{ width: isMdScreen ? "100%" : "fit-content" }}
              >
                Logout
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
