import { FC } from "react";
import CustomSlider from "./Slider";
import { Box, Button } from "@mui/material";
import { Settings } from "react-slick";
import ReactQuill from "react-quill";
import Draggable from "react-draggable";

type Props = {
  images: string[];
  overlayText?: string;
  position?: { x: number; y: number };
  displayButton?: boolean;
  url?: string;
  text?: string;
};

const Template1Carousel: FC<Props> = ({
  images,
  overlayText,
  position,
  displayButton,
  url,
  text
}) => {
  const settings: Settings = {
    slidesToShow: 1,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    cssEase: "linear",
    autoplay: true,
    autoplaySpeed: 2000,
    fade: true,
    arrows: false
  };
  return (
    <CustomSlider settings={settings}>
      {images?.map((slide, index) => (
        <Box
          key={index}
          sx={{
            height: { xs: "150px", sm: "200px", md: "300px", lg: "400px" },
            width: "100%"
          }}
        >
          <img
            src={slide}
            alt={`Slide ${index + 1}`}
            fetchPriority="high"
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "14px",
              objectFit: "cover",
              objectPosition: "start",
              position: "relative"
            }}
          />

          {overlayText && (
            <Box
              sx={{
                position: "absolute",
                top: "0px",
                width: "100%",
                height: "100%",
                zIndex: 5
              }}
            >
              <Draggable position={position}>
                <ReactQuill
                  theme="snow"
                  modules={{ toolbar: false }}
                  value={overlayText}
                  className="custom-quill"
                  readOnly
                />
              </Draggable>
            </Box>
          )}

          {displayButton && (
            <Button
              onClick={() => window.open(url, "_blank")}
              variant="contained"
              sx={{
                position: "absolute",
                bottom: "20px",
                left: "20px",
                width: { sm: "150px", md: "150px" },
                cursor: "pointer"
              }}
            >
              {text}
            </Button>
          )}
        </Box>
      ))}
    </CustomSlider>
  );
};

export default Template1Carousel;
