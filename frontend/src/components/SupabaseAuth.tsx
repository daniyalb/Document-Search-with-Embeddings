import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Auth } from "@supabase/auth-ui-react";
import { createClient } from "@supabase/supabase-js";
import imgUrl from "/login_img.jpg";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const SupabaseAuth = () => {
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
            }}
          >
            Doc<span style={{ color: "#D662FF" }}>Gemini</span>
          </Typography>
        </Box>
        </Toolbar>
      </AppBar>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90%",
          marginTop: "-2em",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "40%",
            outline: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "3em",
            background:
              "radial-gradient(circle at bottom right, rgba(78, 1, 108, 0.7), rgba(2, 15, 129, 0.7))",
            backdropFilter: "blur(10px)",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box
            component="img"
            sx={{
              borderRadius: "3em",
              width: "40%",
              objectFit: "cover",
              opacity: 0.75,
            }}
            alt="An image of a brain made of dots connected by lines"
            src={imgUrl}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "60%",
              paddingTop: "2em",
              paddingBottom: "2em",
            }}
          >
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              providers={["google"]}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SupabaseAuth;
