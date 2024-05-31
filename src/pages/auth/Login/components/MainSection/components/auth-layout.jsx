import { Box, Container, Paper } from "@mui/material";
import useGetLogo from "src/components/logo/hooks/use-logo";

const AuthLayout = ({ children }) => {
  const logo = useGetLogo();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "#F5F5F5",
      }}
    >
      <Container
        fixed
        maxWidth="md"
        sx={{
          height: "100%",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper variant="outlined" sx={{ padding: 8 }}>
          <Box sx={{ display: "flex", mb: 3, justifyContent: "center" }}>
            <img style={{ width: "80px", height: "auto" }} src={logo} />
          </Box>
          {children}
        </Paper>
      </Container>
    </Box>
  );
};

export default AuthLayout;
