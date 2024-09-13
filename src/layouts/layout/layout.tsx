import "./layout.css";
import { Box } from "@mui/material";
import { Navbar } from "../navbar";
import { Outlet } from "react-router-dom";
import Footer from "../footer/footer";
import { storageService } from "@/services";
import { useEffect } from "react";
import { useAppContext } from "@/context/appContext";

const Layout = () => {
  const pathName = window.location.pathname;
  const { setMember } = useAppContext();

  useEffect(() => {
    const member = storageService.getFromLocalStorage("member");
    setMember(member);
  }, []);

  if (pathName === "/login") return <Outlet />;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <Box sx={{ flex: 1 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
