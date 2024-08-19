import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserIcon from "./UserIcon";
import Prompt from "./Prompt";
import Documents from "./Documents";
import Upload from "./Upload";

interface DashboardProps {
  user: any;
  supabase: any;
}

export const Dashboard = ({ user, supabase }: DashboardProps) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
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
          <UserIcon user={user} supabase={supabase} />
        </Toolbar>
      </AppBar>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "90%",
          gap: "2em",
        }}
      >
        <Prompt isMediumScreen={isMediumScreen} isSmallScreen={isSmallScreen} />
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            width: "85%",
            gap: "4em",
            alignItems: "center",
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
            Your Documents
          </Typography>
          <Upload isSmallScreen={isSmallScreen} />
        </Box>
        <Documents
          isMediumScreen={isMediumScreen}
          isSmallScreen={isSmallScreen}
        />
      </Box>
    </>
  );
};

export default Dashboard;
