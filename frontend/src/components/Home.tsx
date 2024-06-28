import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <AppBar
        position="static"
        style={{
          backgroundColor: "transparent",
          boxShadow: "none",
          marginTop: "2em",
          padding: "0 2em",
        }}
      >
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Typography
            variant="h4"
            style={{ color: "#ffffff", fontWeight: "bold" }}
          >
            Doc<span style={{ color: "#D662FF" }}>Gemini</span>
          </Typography>
          <Box>
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
                  padding: "0.75em 3.5em",
                  borderRadius: "15px",
                  border: "none",
                  width: "100%",
                }}
                variant="outlined"
              >
                Login / Sign Up
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "90vh",
          textAlign: "center",
        }}
      >
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            maxWidth: "50%",
          }}
        >
        <Typography
          variant="h3"
          fontWeight={700}
          style={{ marginBottom: "20px", color: "#ffffff" }}
        >
          Harness the power of Generative AI to find the perfect document
        </Typography>
        <Typography
          variant="h6"
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
            padding: "1.2em 1.2em",
            borderRadius: "10px",
            fontSize: "1em",
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
    </>
  );
};

export default Home;
