import React from "react";
import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import {
  Facebook,
  Twitter,
  LinkedIn,
  Phone,
  Email,
  LocationOn
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { theme } from "@/theme";
import { useAppContext } from "@/context/appContext";

const Footer: React.FC = () => {
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { programDetails } = useAppContext();

  const logo = programDetails?.programLogoUri
    ? import.meta.env.VITE_REACT_APP_CORE_ENGINE_URL + programDetails?.programLogoUri
    : "/assets/logo/loyyal-logo.svg";

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "black",
        color: "white",
        py: 4,
        px: isMdScreen ? 4 : 8
      }}
    >
      <Grid container spacing={6} justifyContent="space-between">
        {/* Logo and Description */}
        <Grid item xs={12} md={4} sx={{ placeItems: "center" }}>
          <Link to="/">
            <Box
              sx={{
                width: 100,
                height: 40,
                display: "inline-flex",
                mb: 2
              }}
            >
              <img alt="loyyal logo" src={logo} />
            </Box>
          </Link>
          {/* <Typography variant="body1">
            Ready to take the next step in your AI career? Sign up for the AI Job Board
            today and unlock a world of exciting career opportunities in artificial
            intelligence. Your dream job awaits—don’t miss out!
          </Typography> */}
          <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
            <Facebook />

            <Twitter />

            <LinkedIn />
          </Box>
        </Grid>

        {/* Licence Links */}
        <Grid item xs={12} md={3}>
          <Box
            sx={{
              display: "flex",
              justifyContent: isMdScreen ? "flex-start" : "center"
            }}
          >
            <Box>
              <Typography variant="h6" mb={isMdScreen ? 2 : 4}>
                Licence
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography variant="body1">
                  <a href="#" style={{ color: "white", textDecoration: "none" }}>
                    Privacy Policy
                  </a>
                </Typography>
                <Typography variant="body1">
                  <a href="#" style={{ color: "white", textDecoration: "none" }}>
                    Blogs
                  </a>
                </Typography>
                <Typography variant="body1">
                  <a href="#" style={{ color: "white", textDecoration: "none" }}>
                    Copyright
                  </a>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* Contact Information */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              display: "flex",
              justifyContent: isMdScreen ? "flex-start" : "flex-end"
            }}
          >
            <Box>
              <Typography variant="h6" mb={isMdScreen ? 2 : 4}>
                Contact
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Phone sx={{ mr: 1 }} fontSize="small" />
                <Typography variant="body1">(406) 555-0120</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Email sx={{ mr: 1 }} fontSize="small" />
                <Typography variant="body1">loyyal@gmail.com</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <LocationOn sx={{ mr: 1 }} fontSize="small" />
                <Typography variant="body1">
                  2972 Westheimer Rd. Santa Ana, Illinois 85486
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
