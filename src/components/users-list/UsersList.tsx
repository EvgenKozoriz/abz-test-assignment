import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import UserCard from "./UserCard";
import { Box, CircularProgress } from "@mui/material";
import { Element } from "react-scroll";
import CustomButton from "../CustomButton";
import Registration from "../registration/Registration";

interface IUserData {
  avatarSrc: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  registration_timestamp: Date;
}

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<IUserData[]>([]);
  const [page, setPage] = useState<number>(1);
  const [showMoreButton, setShowMoreButton] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUsers = async (pageNumber: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${pageNumber}&count=6`
      );
      const data = await response.json();

      if (data.success) {
        const newUsers = data.users.map((user: any) => ({
          avatarSrc: user.photo,
          name: user.name,
          position: user.position,
          email: user.email,
          phone: user.phone,
          registration_timestamp: user.registration_timestamp,
        }));

        setUsers((prevUsers) => [...prevUsers, ...newUsers]);

        const nextUrl = data.links.next_url;
        setShowMoreButton(!!nextUrl);
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(1);
  }, []);

  const handleShowMoreClick = () => {
    const nextPage = page + 1;
    fetchUsers(nextPage);
    setPage(nextPage);
  };

  const handleRegistrationSuccess = async () => {
    setPage(1);
    setUsers([]);
    fetchUsers(1)
   
  };

  return (
    <Element name="usersList">
      <Box
        sx={{
          width: {
            mobile: "100%",
            tablet: "100%",
            laptop: "1024px",
            desktop: "100%",
          },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: "140px",
        }}
      >
        <Typography
          variant="h1"
          mb="50px"
          sx={{
            maxWidth: {
              mobile: "328px",
              tablet: "100%",
              laptop: "100%",
              desktop: "100%",
            },
            textAlign: "center",
          }}
        >
          Working with GET request
        </Typography>

        <Grid
          container
          justifyContent="center"
          alignItems="center"
          direction={{
            mobile: "column",
            tablet: "row",
            laptop: "row",
            desktop: "row",
          }}
          gap={{
            mobile: "20px",
            tablet: "16px",
            laptop: "29px",
            desktop: "29px",
          }}
          sx={{
            p: {
              mobile: "0 16px",
              tablet: "0 32px",
              laptop: "0 60px",
              desktop: "0 696px",
            },
          }}
        >
          {users.map((user, index) => (
            <Grid item key={index}>
              <UserCard
                avatarSrc={user.avatarSrc}
                name={user.name}
                position={user.position}
                email={user.email}
                phone={user.phone}
              />
            </Grid>
          ))}
        </Grid>
        {loading && <CircularProgress sx={{ marginTop: "50px" }} />}
        {showMoreButton && (
          <CustomButton
            label="Show more"
            styles={{ marginTop: "50px" }}
            onClick={handleShowMoreClick}
          />
        )}
      </Box>
      <Registration onRegistrationSuccess={handleRegistrationSuccess} />
    </Element>
  );
};

export default UsersList;
