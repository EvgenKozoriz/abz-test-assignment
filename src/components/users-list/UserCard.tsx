import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import CustomTooltipText from "../CustomTooltipText";

interface IUserCardProps {
  avatarSrc: string;
  name: string;
  position: string;
  email: string;
  phone: string;
}

const UserCard: React.FC<IUserCardProps> = ({
  avatarSrc,
  name,
  position,
  email,
  phone,
}) => {
  return (
    <Card
      sx={{
        width: {
          mobile: "328px",
          tablet: "344px",
          laptop: "282px",
          desktop: "370px",
        },
        height: "254px",
        borderRadius: "16px",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: "20px",
        }}
      >
        <Avatar
          alt="User Avatar"
          src={avatarSrc}
          sx={{ width: "70px", height: "70px", mb: "20px" }}
        />
        <CustomTooltipText text={name} styles={{ marginBottom: "20px" }} />
        <CustomTooltipText text={position} />
        <CustomTooltipText text={email} />
        <CustomTooltipText text={phone} />
      </CardContent>
    </Card>
  );
};

export default UserCard;
