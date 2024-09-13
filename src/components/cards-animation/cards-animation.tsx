import { theme } from "@/theme";
import { Box, useMediaQuery } from "@mui/material";
// Images
import giftcard1 from "@/assets/wishlist/giftcard1.jpg";
import giftcard2 from "@/assets/wishlist/giftcard2.png";
import giftcard3 from "@/assets/wishlist/giftcard3.png";
import giftcard4 from "@/assets/wishlist/giftcard4.jpg";
import giftcard5 from "@/assets/wishlist/giftcard5.png";

const CardsAnimation = () => {
  const isSmScreen = useMediaQuery(theme.breakpoints.down("md"));

  const giftCards = [
    {
      src: giftcard1,
      style: { left: "20%", top: "65%", transform: "rotate(-50deg)", zIndex: 1 }
    },
    {
      src: giftcard2,
      style: { left: "10%", top: "50%", transform: "rotate(-30deg)", zIndex: 2 }
    },
    {
      src: giftcard3,
      style: { left: "4%", top: "35%", transform: "rotate(-10deg)", zIndex: 3 }
    },
    {
      src: giftcard4,
      style: { left: "4%", top: "22%", transform: "rotate(10deg)", zIndex: 4 }
    },
    {
      src: giftcard5,
      style: { left: "8%", top: "10%", transform: "rotate(40deg)", zIndex: 5 }
    }
  ];

  return (
    <Box>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: isSmScreen ? "20px" : "50px",
          transform: "translateY(-50%)",
          height: "100%",
          width: "90%"
        }}
      >
        {giftCards.map((card, index) => (
          <img
            key={index}
            src={card.src}
            alt={`gift card ${index + 1}`}
            style={{
              position: "absolute",
              width: isSmScreen ? "100px" : "230px",
              height: isSmScreen ? "70px" : "150px",
              objectFit: "cover",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              ...card.style
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default CardsAnimation;
