import React from "react";
import logoPath from "../../logo.svg";
import { AppBar, Box, Toolbar } from "@mui/material";
import { Link as ScrollLink } from "react-scroll";
import CustomButton from "../CustomButton";

const Header: React.FC = () => {
  return (
    <AppBar
      position="static"
      sx={{
        width: {
          mobile: "360px",
          tablet: "768px",
          laptop: "1024px",
          desktop: "2560px",
        },
        backgroundColor: "#fff",
        p: {
          mobile: 0,
          tablet: "0 32px",
          laptop: "0 60px",
          desktop: "0 695px",
        },
      }}
      elevation={0}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", p: 0 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img src={logoPath} alt="logo" />
        </Box>
        <Box>
          <ScrollLink to="usersList" smooth duration={500}>
            <CustomButton label="Users" styles={{ marginRight: "10px" }} />
          </ScrollLink>
          <ScrollLink to="registration" smooth duration={500}>
            <CustomButton label="Sign up" />
          </ScrollLink>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
