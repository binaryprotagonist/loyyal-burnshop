import { createTheme, responsiveFontSizes } from "@mui/material";
import type { Theme as ITheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }

  interface IColor {
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  }
  interface Palette {
    tertiary: Palette["primary"];
    neutral: IColor;
  }
  interface PaletteOptions {
    tertiary?: PaletteOptions["primary"];
    neutral: IColor;
  }

  interface PaletteColor {
    lighter?: string;
    darker?: string;
  }
  interface SimplePaletteColorOptions {
    lighter?: string;
    darker?: string;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    tertiary: true;
  }
}
declare module "@mui/material/IconButton" {
  interface IconButtonPropsColorOverrides {
    tertiary: true;
  }
}

declare module "@mui/material/Icon" {
  interface IconPropsColorOverrides {
    tertiary: true;
  }
}

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    mdl: true;
    lg: true;
    xl: true;
  }
}

export const theme: ITheme = responsiveFontSizes(
  createTheme({
    palette: {
      neutral: {
        100: "#F3F4F6",
        200: "#E5E7EB",
        300: "#D1D5DB",
        400: "#9CA3AF",
        500: "#6B7280",
        600: "#4B5563",
        700: "#374151",
        800: "#1F2937",
        900: "#111827"
      },
      action: {
        active: "#e3e5e8",
        focus: "rgba(55, 65, 81, 0.12)",
        hover: "rgba(55, 65, 81, 0.07)",
        selected: "rgba(55, 65, 81, 0.08)",
        disabledBackground: "rgba(55, 65, 81, 0.12)",
        disabled: "rgba(55, 65, 81, 0.26)"
      },
      background: {
        default: "#F9FAFC",
        paper: "#FFFFFF"
      },
      divider: "#E6E8F0",
      primary: {
        light: "#5BE584",
        main: "#000000",
        dark: "#000000",
        contrastText: "#FFFFFF"
      },
      secondary: {
        light: "#84A9FF",
        main: "#3366FF",
        dark: "#1939B7",
        contrastText: "#FFFFFF"
      },
      success: {
        lighter: "#D8FBDE",
        light: "#86E8AB",
        main: "#36B37E",
        dark: "#1B806A",
        darker: "#0A5554",
        contrastText: "#FFFFFF"
      },
      info: {
        lighter: "#CAFDF5",
        light: "#61F3F3",
        main: "#00B8D9",
        dark: "#006C9C",
        darker: "#003768",
        contrastText: "#FFFFFF"
      },
      warning: {
        lighter: "#FFF5CC",
        light: "#FFD666",
        main: "#FFAB00",
        dark: "#B76E00",
        darker: "#7A4100",
        contrastText: "lightGray"
      },
      error: {
        lighter: "#FFE9D5",
        light: "#FFAC82",
        main: "#FF5630",
        dark: "#B71D18",
        darker: "#7A0916",
        contrastText: "#FFFFFF"
      },
      text: {
        primary: "#121828",
        secondary: "#65748B",
        disabled: "rgb(88,88,88)"
      }
    },
    shape: {
      borderRadius: 8
    },
    shadows: [
      "none",
      "0px 1px 1px rgba(100, 116, 139, 0.06), 0px 1px 2px rgba(100, 116, 139, 0.1)",
      "0px 1px 2px rgba(100, 116, 139, 0.12)",
      "0px 1px 4px rgba(100, 116, 139, 0.12)",
      "0px 1px 5px rgba(100, 116, 139, 0.12)",
      "0px 1px 6px rgba(100, 116, 139, 0.12)",
      "0px 2px 6px rgba(100, 116, 139, 0.12)",
      "0px 3px 6px rgba(100, 116, 139, 0.12)",
      "0px 2px 4px rgba(31, 41, 55, 0.06), 0px 4px 6px rgba(100, 116, 139, 0.12)",
      "0px 5px 12px rgba(100, 116, 139, 0.12)",
      "0px 5px 14px rgba(100, 116, 139, 0.12)",
      "0px 5px 15px rgba(100, 116, 139, 0.12)",
      "0px 6px 15px rgba(100, 116, 139, 0.12)",
      "0px 7px 15px rgba(100, 116, 139, 0.12)",
      "0px 8px 15px rgba(100, 116, 139, 0.12)",
      "0px 9px 15px rgba(100, 116, 139, 0.12)",
      "0px 10px 15px rgba(100, 116, 139, 0.12)",
      "0px 12px 22px -8px rgba(100, 116, 139, 0.25)",
      "0px 13px 22px -8px rgba(100, 116, 139, 0.25)",
      "0px 14px 24px -8px rgba(100, 116, 139, 0.25)",
      "0px 10px 10px rgba(31, 41, 55, 0.04), 0px 20px 25px rgba(31, 41, 55, 0.1)",
      "0px 25px 50px rgba(100, 116, 139, 0.25)",
      "0px 25px 50px rgba(100, 116, 139, 0.25)",
      "0px 25px 50px rgba(100, 116, 139, 0.25)",
      "0px 25px 50px rgba(100, 116, 139, 0.25)"
    ],
    components: {
      MuiButton: {
        defaultProps: {
          disableElevation: true
        },
        styleOverrides: {
          root: {
            textTransform: "none"
          },
          sizeSmall: {
            padding: "6px 16px"
          },
          sizeMedium: {
            padding: "8px 20px"
          },
          sizeLarge: {
            padding: "11px 24px"
          },
          textSizeSmall: {
            padding: "7px 12px"
          },
          textSizeMedium: {
            padding: "9px 16px"
          },
          textSizeLarge: {
            padding: "12px 16px"
          }
        }
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            "&.Mui-error": {
              color: "#D14343"
            }
          }
        }
      },
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true
        }
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            padding: "32px 24px",
            "&:last-child": {
              paddingBottom: "32px"
            }
          }
        }
      },
      MuiCardHeader: {
        defaultProps: {
          titleTypographyProps: {
            variant: "h6"
          },
          subheaderTypographyProps: {
            variant: "body2"
          }
        },
        styleOverrides: {
          root: {
            padding: "32px 24px"
          }
        }
      },
      MuiCssBaseline: {
        styleOverrides: {
          "*": {
            boxSizing: "border-box",
            margin: 0,
            padding: 0
          },
          html: {
            MozOsxFontSmoothing: "grayscale",
            WebkitFontSmoothing: "antialiased",
            display: "flex",
            flexDirection: "column",
            minHeight: "100%",
            width: "100%"
          },
          body: {
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            minHeight: "100%",
            width: "100%"
          },
          "#__next": {
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            height: "100%",
            width: "100%"
          }
        }
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            ".Mui-disabled": {
              cursor: "not-allowed",
              borderRadius: 8
            }
          }
        }
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: "#E6E8F0"
          }
        }
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            backgroundColor: "#F3F4F6",
            ".MuiTableCell-root": {
              color: "#374151"
            },
            borderBottom: "none",
            "& .MuiTableCell-root": {
              borderBottom: "none",
              fontSize: "12px",
              fontWeight: 600,
              lineHeight: 1,
              letterSpacing: 0.5,
              textTransform: "uppercase"
            },
            "& .MuiTableCell-paddingCheckbox": {
              paddingTop: 4,
              paddingBottom: 4
            }
          }
        }
      }
    },
    typography: {
      button: {
        fontWeight: 600
      },
      fontFamily:
        '"Gilroy", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
      body1: {
        fontSize: "1rem",
        fontWeight: 400,
        lineHeight: 1.5
      },
      body2: {
        fontSize: "0.875rem",
        fontWeight: 400,
        lineHeight: 1.57
      },
      subtitle1: {
        fontSize: "1rem",
        fontWeight: 500,
        lineHeight: 1.75
      },
      subtitle2: {
        fontSize: "0.875rem",
        fontWeight: 500,
        lineHeight: 1.57
      },
      overline: {
        fontSize: "0.75rem",
        fontWeight: 600,
        letterSpacing: "0.5px",
        lineHeight: 2.5,
        textTransform: "uppercase"
      },
      caption: {
        fontSize: "0.75rem",
        fontWeight: 400,
        lineHeight: 1.66
      },
      h1: {
        fontWeight: 700,
        fontSize: "3.5rem",
        lineHeight: 1.375
      },
      h2: {
        fontWeight: 700,
        fontSize: "3rem",
        lineHeight: 1.375
      },
      h3: {
        fontWeight: 700,
        fontSize: "2.25rem",
        lineHeight: 1.375
      },
      h4: {
        fontWeight: 700,
        fontSize: "2rem",
        lineHeight: 1.375
      },
      h5: {
        fontWeight: 600,
        fontSize: "1.5rem",
        lineHeight: 1.375
      },
      h6: {
        fontWeight: 600,
        fontSize: "1.125rem",
        lineHeight: 1.375
      }
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        mdl: 1180,
        lg: 1280,
        xl: 1920
      }
    }
  })
);
