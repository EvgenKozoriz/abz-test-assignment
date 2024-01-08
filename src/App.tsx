import Header from "./components/header/Header";
import Banner from "./components/banner/Banner";
import UsersList from "./components/users-list/UsersList";
import { ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";
import { theme } from "./theme/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "background.default",
          pb: "100px",
        }}
      >
        <Header />
        <Banner />
        <UsersList />
      </Box>
    </ThemeProvider>
  );
}

export default App;
