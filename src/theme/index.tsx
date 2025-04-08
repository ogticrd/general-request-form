import { ThemeProvider as MUIThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#003876",
    },
    secondary: {
      main: "#EE2A24",
    },
    info: {
      main: "#0087FF",
    },
    background: {
      default: "#EFF7FF",
    },
  },

  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(','),
    h1: {
      fontWeight: '600',
      fontSize: '60px',
      // lineHeight: '80px',
      color: '#003876',
    },
    h2: {
      fontWeight: '500',
      // fontSize: '60px',
      // lineHeight: '90px',
      color: '#003876',
    },
    h6: {
      fontWeight: '600',
    },
    body1: {
      fontSize: '18px',
      color: '#433E3E',
      fontWeight: '600',
      lineHeight: "32px"
    },
    body2: {
      fontSize: '16px',
      color: '#000000',
      fontWeight: '400',
      lineHeight: "32px"
    },
    subtitle1: {
      color: "#0087FF"
    },
    subtitle2: {
      fontWeight: '600',
      fontSize: '32px',
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ".MuiBox-root": {
          border: "1px solid #E2E2E2",
          padding: "15px",
          borderRadius: "5px"
        }
      }
    },
    MuiButton: {
      defaultProps: {
        sx: {
          borderRadius: "999px",
        }
      },
      styleOverrides: {
        root: {
          '&.MuiButton-colorInherit': {
            color: '#ffffff',
          },
        },
      },
    },
    MuiAccordion: {
      defaultProps: {
        sx: {
          boxShadow: "0px 25px 45px 0px #96AB8C24",
        }
      }
    },
    MuiInputLabel: {
      defaultProps: {
        sx: {
          fontSize: "16px",
          fontWeight: "400",
          color: "#003579",
          overflow: "unset",

          "& span": {
            color: red[500],
          },
        },
      },
    },
    MuiFormLabel: {
      defaultProps: {
        sx: {
          fontSize: "16px",
          fontWeight: "400",

          "& span": {
            color: red[500],
          },
        },
      },
    },
    MuiCheckbox: {
      defaultProps: {
        sx: {
          fontSize: "14px",
          fontWeight: "400",
        }
      }
    },
    MuiTextField: {
      // defaultProps: {
      //   sx: {
      //     '& .MuiStandardInput-root': {
      //       background: '#F8F8F8',
      //       color: "red"
      //     },
      //   }
      // },
      styleOverrides: {
        root: {
          background: '#ffffff',
        }
      }
    },

    MuiStepIcon: {
      styleOverrides: {
        root: {
          '&.Mui-active': {
            color: "#0087FF",
          },
        },
      },
    }
  },
});

export const ThemeProvider = ({ children }: any) => {
  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}
