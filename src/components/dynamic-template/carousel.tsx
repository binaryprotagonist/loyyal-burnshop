import { Box } from "@mui/material";
import Template1Carousel from "../slider/Template1Carousel";
import { FC } from "react";

interface ICarouselProps {
  componentInstanceConfig: any;
}

const Carousel: FC<ICarouselProps> = ({ componentInstanceConfig }) => {
  const images = componentInstanceConfig?.imageURLs?.map(
    (image: string) => import.meta.env.VITE_REACT_APP_CORE_ENGINE_URL + image
  );

  const overlayText = componentInstanceConfig?.overlayText?.text;
  const position = {
    x: componentInstanceConfig?.overlayText?.position.x,
    y: componentInstanceConfig?.overlayText?.position?.y
  };

  const url = componentInstanceConfig?.button?.url;
  const text = componentInstanceConfig?.button?.text;
  const displayButton = componentInstanceConfig?.button?.displayButton;

  return (
    <Box
      sx={{
        width: "100%",
        my: { xs: 2, sm: 3, md: 4 }
      }}
    >
      <Template1Carousel
        url={url}
        text={text}
        images={images}
        position={position}
        overlayText={overlayText}
        displayButton={displayButton}
      />
    </Box>
  );
};

export default Carousel;
