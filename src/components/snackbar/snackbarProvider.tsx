import { ReactNode, useRef, MutableRefObject } from "react";
import { SnackbarProvider as NotistackProvider, SnackbarKey } from "notistack";
// @mui
import { alpha } from "@mui/material/styles";
import { Box, IconButton } from "@mui/material";

import StyledNotistack from "./styles";
import Iconify from "../iconify/iconify";

// ----------------------------------------------------------------------

export default function SnackbarProvider({ children }: { children: ReactNode }) {
  const notistackRef = useRef<NotistackProvider | null>(null);

  const onClose = (key: SnackbarKey) => () => {
    if (notistackRef.current) {
      notistackRef.current.closeSnackbar(key);
    }
  };

  return (
    <>
      <StyledNotistack />

      <NotistackProvider
        ref={notistackRef as MutableRefObject<NotistackProvider | null>}
        dense
        maxSnack={5}
        preventDuplicate
        autoHideDuration={3000}
        variant="success" // Set default variant
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        iconVariant={{
          info: <SnackbarIcon icon="eva:info-fill" color="info" />,
          success: <SnackbarIcon icon="eva:checkmark-circle-2-fill" color="success" />,
          warning: <SnackbarIcon icon="eva:alert-triangle-fill" color="warning" />,
          error: <SnackbarIcon icon="eva:alert-circle-fill" color="error" />
        }}
        // With close as default
        action={(key) => (
          <IconButton size="small" onClick={onClose(key)} sx={{ p: 0.5 }}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        )}
      >
        {children}
      </NotistackProvider>
    </>
  );
}

// ----------------------------------------------------------------------

type SnackbarIconProps = {
  icon: string;
  color: "primary" | "secondary" | "info" | "success" | "warning" | "error";
};

function SnackbarIcon({ icon, color }: SnackbarIconProps) {
  return (
    <Box
      component="span"
      sx={{
        mr: 1.5,
        width: 40,
        height: 40,
        display: "flex",
        borderRadius: 1.5,
        alignItems: "center",
        justifyContent: "center",
        color: (theme) => theme.palette[color].main,
        bgcolor: (theme) => alpha(theme.palette[color].main, 0.16)
      }}
    >
      <Iconify icon={icon} width={24} />
    </Box>
  );
}
