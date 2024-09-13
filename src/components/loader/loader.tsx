import { Backdrop, CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <Backdrop open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loader;
