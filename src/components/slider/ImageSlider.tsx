import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import CustomSlider from "./Slider";
import { styled } from "@mui/system";
import { Settings } from "react-slick";
import { theme } from "@/theme";

type Props = {
  images: string[];
  selectedImage: string;
  onImageClick: (image: string) => void;
};

const ImageSlider: React.FC<Props> = ({ images, selectedImage, onImageClick }) => {
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));

  const settings: Settings = {
    slidesToShow: images.length === 2 ? 2 : 3,
    slidesToScroll: 3
  };
  return (
    <CustomSlider settings={settings}>
      {images?.map((slide, index) => (
        <SlideBox
          key={index}
          onClick={() => onImageClick(slide)}
          sx={{ height: isMdScreen ? "100%" : "80px" }}
        >
          <img
            src={slide}
            alt={`Slide ${index + 1}`}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "14px",
              border: `${selectedImage === slide ? "2px solid #000" : ""}`
            }}
          />
        </SlideBox>
      ))}
    </CustomSlider>
  );
};

export default ImageSlider;

const SlideBox = styled(Box)(() => ({
  width: "100%",
  cursor: "pointer"
}));
