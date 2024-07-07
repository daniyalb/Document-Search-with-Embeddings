import { Box } from "@mui/material";

interface PromptProps {
    isSmallScreen: boolean;
    isMediumScreen: boolean;
}

const Prompt = ({ isSmallScreen, isMediumScreen }: PromptProps) => {
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
                style={{
                    border: "none",
                    background: "transparent",
                    color: "white",
                    fontSize: isSmallScreen ? "1rem" : isMediumScreen ? "1.1rem" : "1.25rem",
                    outline: "none",
                    width: "100%",
                }}
            />
        </Box>
    );
};

export default Prompt;
