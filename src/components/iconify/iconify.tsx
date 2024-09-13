import { forwardRef } from "react";
// icons
import { Icon } from "@iconify/react";
// @mui
import { Box } from "@mui/material";

// ----------------------------------------------------------------------

type Props = {
  icon: string;
  width?: number | string;
  sx?: object;
};

const Iconify: React.FC<Props> = forwardRef(({ icon, width = 20, sx, ...other }, ref) => (
  <Box
    ref={ref}
    component={Icon}
    icon={icon}
    sx={{ width, height: width, ...sx }}
    {...other}
  />
));

export default Iconify;
