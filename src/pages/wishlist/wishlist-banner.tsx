import { Box } from "@mui/material";
import wishlist from "../../assets/home/wishlist.png";

const WishlistBanner = () => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: "150px", sm: "200px", md: "400px" }
      }}
    >
      <img
        src={wishlist}
        alt="wishlist banner"
        height={"100%"}
        width={"100%"}
        style={{ objectFit: "cover", borderRadius: "14px" }}
      />
    </Box>
  );
};

export default WishlistBanner;
