import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";

export const Home = () => {
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
            <Button
              color="inherit"
              style={{
                borderColor: "#ffffff",
                color: "#ffffff",
                marginRight: "3em",
                padding: "0.75em 3.5em",
                borderRadius: "15px",
              }}
              variant="outlined"
            >
              Login
            </Button>
            <Button
              color="inherit"
              style={{
                border: "2px solid",
                borderImage: "linear-gradient(to right, #D14EFF, #9F03B8)",
                borderImageSlice: 1,
                color: "#ffffff",
                padding: "0.75em 3.5em",
              }}
              variant="outlined"
            >
              Sign up
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" style={{ textAlign: "center" }}>
        <Box style={{ marginTop: "20vh" }}>
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
          >
            Get Started
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Home;
