import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
    interface BreakpointOverrides {
      xs: false;
      sm: false;
      md: false;
      lg: false;
      xl: false;
      mobile: true;
      tablet: true;
      laptop: true;
      desktop: true;
    }
  }
  
 export const theme = createTheme({
    breakpoints: {
      values: {
        mobile: 0,
        tablet: 768,
        laptop: 1024,
        desktop: 2560,
      },
    },
  
    components: {
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
      },
    },
    palette: {
      primary: {
        main: "#f4e041",
      },
      secondary: {
        main: "#00bdd3",
      },
      text: {
        primary: "rgba(0, 0, 0, 0.87)",
      },
      background: {
        default: "#f8f8f8",
      },
    },
    typography: {
      fontFamily: "Nunito, sans-serif",
      h1: {
        fontFamily: "Nunito",
        fontWeight: 400,
        fontSize: "40px",
        lineHeight: "40px",
      },
      body1: {
        fontFamily: "Nunito",
        fontWeight: 400,
        fontSize: "16px",
        lineHeight: "26px",
      },
    },
  });