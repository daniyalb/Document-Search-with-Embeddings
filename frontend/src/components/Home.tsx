import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      style={{
        height: "100vh",
      }}
    >
      <AppBar
        position="static"
        style={{
          backgroundColor: "transparent",
          boxShadow: "none",
          padding: isSmallScreen ? "0.5em" : "2em",
          height: "10%",
        }}
      >
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Box
            onClick={() => navigate("/")}
            style={{
              cursor: "pointer",
            }}
          >
            <Typography
              variant="h4"
              style={{
                color: "#ffffff",
                fontWeight: "bold",
                fontSize: isSmallScreen ? "1.5rem" : "2rem",
                marginRight: isSmallScreen ? "1em" : "0",
              }}
            >
              Doc<span style={{ color: "#D662FF" }}>Gemini</span>
            </Typography>
          </Box>
          <Box
            sx={{
              background: "linear-gradient(to right, #D14EFF, #9F03B8)",
              borderRadius: "15px",
              padding: "2px",
            }}
          >
            <Button
              color="inherit"
              sx={{
                color: "#ffffff",
                marginRight: "3em",
                padding: isSmallScreen ? "0.5em 2em" : "0.75em 3.5em",
                borderRadius: "15px",
                border: "none",
                width: "100%",
                fontSize: isSmallScreen ? "0.75rem" : "1rem",
              }}
              variant="outlined"
            >
              Login / Sign Up
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "90%",
          textAlign: "center",
        }}
      >
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            maxWidth: isSmallScreen ? "90%" : "50%",
          }}
        >
          <Typography
            variant="h3"
            fontSize={isSmallScreen ? "2rem" : "3rem"}
            fontWeight={700}
            style={{ marginBottom: "20px", color: "#ffffff" }}
          >
            Harness the power of Generative AI to find the perfect document
          </Typography>
          <Typography
            variant="h6"
            fontSize={isSmallScreen ? "1rem" : "1.2rem"}
            fontWeight={300}
            style={{ marginBottom: "40px", color: "#cfcfcf" }}
          >
            Effortlessly find the perfect document by describing your needs –
            powered by Gemini AI and advanced embeddings for precise semantic
            search.
          </Typography>
          <Button
            variant="contained"
            style={{
              background: "linear-gradient(to right, #D14EFF, #9F03B8)",
              color: "#ffffff",
              padding: isSmallScreen ? "0.5em 2em" : "0.75em 3.5em",
              borderRadius: "10px",
              fontSize: "1rem",
              fontWeight: "bold",
              transition: "background 0.3s",
              border: "none",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.background =
                "linear-gradient(to right, #B130E8, #8F029A)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.background =
                "linear-gradient(to right, #D14EFF, #9F03B8)")
            }
            onClick={() => navigate("/dashboard")}
          >
            Get Started
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
