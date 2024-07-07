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

interface DashboardProps {
  userToken: string;
  user: any;
  supabase: any;
}

export const Dashboard = ({ userToken, user, supabase }: DashboardProps) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // useEffect(() => {
  //   const generateEmbedding = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:8080/api/generate/embedding",
  //         {
  //           headers: { Authorization: userToken },
  //         }
  //       );
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   generateEmbedding();
  // }, []);

  return (
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
  );
};

export default Dashboard;
