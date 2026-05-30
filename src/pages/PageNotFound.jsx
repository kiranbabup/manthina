import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Button, Typography, Container, Box } from "@mui/material";
import page404img from "../assets/404.png";

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
}));

export default function PageNotFound() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <Box sx={{ width: "100vw" }}>
      <Container sx={{ mt: 8 }}>
        <ContentStyle sx={{ textAlign: "center", alignItems: "center" }}>
          <Typography variant="h3" paragraph>
            Sorry, page not found!
          </Typography>

          <Typography sx={{ color: "text.secondary" }}>
            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
            mistyped the URL? Be sure to check your spelling.
          </Typography>

          <Box
            component="img"
            src={page404img}
            sx={{ height: 300, mx: "auto", my: 1 }}
          />

          <Button size="large" variant="contained" onClick={handleBack}>Go back to login</Button>
        </ContentStyle>
      </Container>
    </Box>
  );
}
