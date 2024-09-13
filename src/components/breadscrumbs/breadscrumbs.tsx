import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
const Breadscrumbs = () => {
  return (
    <div role="presentation" onClick={() => console.info("Clicked!")}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          Shope
        </Link>
        <Typography color="text.primary">Electronics</Typography>
      </Breadcrumbs>
    </div>
  );
};

export default Breadscrumbs;
