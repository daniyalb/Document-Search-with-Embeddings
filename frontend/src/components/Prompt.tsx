import { Box } from "@mui/material";
import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../App";
import toast from "react-hot-toast";

interface PromptProps {
  isSmallScreen: boolean;
  isMediumScreen: boolean;
}

const Prompt = ({ isSmallScreen, isMediumScreen }: PromptProps) => {
  const [prompt, setPrompt] = useState("");
  const { userToken } = useContext(UserContext);

  const handleSubmit = async () => {
    toast.promise(
      axios
        .post(
          "http://localhost:8080/api/makeQuery",
          { prompt },
          {
            headers: {
              Authorization: userToken,
            },
          }
        )
        .then((response) => console.log(response.data))
        .catch((error) => {
          console.error(error);
          throw error;
        }),
      {
        loading: "Searching for documents...",
        success: "Documents found successfully!",
        error: (err) => `${err.response.data}`,
      }
    );
  };

  return (
    <Box
      sx={{
        width: isSmallScreen ? "80%" : isMediumScreen ? "70%" : "60%",
        outline: "1px solid rgba(255, 255, 255, 0.3)",
        borderRadius: "3em",
        background: "#331B79",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        marginTop: "4em",
        padding: "1em",
      }}
    >
      <input
        type="text"
        placeholder="Enter your prompt here to search for a document..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
        style={{
          border: "none",
          background: "transparent",
          color: "white",
          fontSize: isSmallScreen
            ? "1rem"
            : isMediumScreen
            ? "1.1rem"
            : "1.25rem",
          outline: "none",
          width: "100%",
        }}
      />
    </Box>
  );
};

export default Prompt;
