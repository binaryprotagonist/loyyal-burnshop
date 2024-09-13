import React from "react";
import { Box, styled } from "@mui/material";
import Slider, { Settings, CustomArrowProps } from "react-slick";

interface CustomSliderProps {
  children: React.ReactNode;
  settings?: Settings;
}

const CustomSlider: React.FC<CustomSliderProps> = ({ children, settings }) => {
  const defaultSettings: Settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    ...settings
  };

  return <StyledSlider {...defaultSettings}>{children}</StyledSlider>;
};

export default CustomSlider;

const Arrow = styled(Box)(() => ({
  "&:before": {
    color: "gray"
  }
}));

const NextArrow: React.FC<CustomArrowProps> = (props) => {
  const { className, style, onClick } = props;
  return <Arrow className={className} onClick={onClick} sx={style} />;
};

const PrevArrow: React.FC<CustomArrowProps> = (props) => {
  const { className, style, onClick } = props;
  return <Arrow className={className} onClick={onClick} sx={style} />;
};

const StyledSlider = styled(Slider)(() => ({
  ".slick-slide": {
    height: "100%",
    padding: "0 5px",
    boxSizing: "border-box"
  },
  ".slick-list": {
    margin: "0 -5px"
  }
}));
