import React from "react";
import imgPath from "../../Assets/banner-photo.jpeg";
import { Box, Typography } from "@mui/material";
import { Link as ScrollLink } from "react-scroll";
import CustomButton from "../CustomButton";
const Banner = () => {
  return (
    <Box
      sx={{
        margin: "0 auto",
        mb: "140px",
        position: "relative",
        width: {
          mobile: "100%",
          tablet: "100%",
          laptop: "1024px",
          desktop: "1170px",
        },
        height: {
          mobile: "500px",
          tablet: "500px",
          laptop: "650px",
          desktop: "650px",
        },
      }}
    >
      <Box
        component="div"
        sx={{
          width: "100%",
          height: "100%",
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${imgPath})`,
          backgroundSize: {
            mobile: "1150px",
            tablet: "1300px",
            laptop: "160%",
            desktop: "160%",
          },
          objectFit: "cover",
          backgroundPosition: "bottom",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Box
          sx={{
            width: {
              mobile: "328px",
              tablet: "380px",
              laptop: "380px",
              desktop: "380px",
            },
            textAlign: "center",
            color: "#fff",
            zIndex: 1,
          }}
        >
          <Typography variant="h1" sx={{ mb: "20px" }}>
            Test assignment for front-end developer
          </Typography>

          <Typography variant="body1" sx={{ mb: "32px" }}>
            What defines a good front-end developer is one that has skilled
            knowledge of HTML, CSS, JS with a vast understanding of User design
            thinking as they'll be building web interfaces with accessibility in
            mind. They should also be excited to learn, as the world of
            Front-End Development keeps evolving.
          </Typography>
          <ScrollLink to="registration" smooth={true} duration={500}>
            <CustomButton label="Sign up" />
          </ScrollLink>
        </Box>
      </Box>
    </Box>
  );
};

export default Banner;
