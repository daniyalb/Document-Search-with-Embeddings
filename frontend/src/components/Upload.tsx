import { Button } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";

interface UploadProps {
  isSmallScreen: boolean;
}

const Upload = ({ isSmallScreen }: UploadProps) => {
  return (
    <Button
      variant="contained"
      style={{
        background: "linear-gradient(to right, #D14EFF, #9F03B8)",
        color: "#ffffff",
        padding: isSmallScreen ? "0.25em 1.5em" : "0.5em 2em",
        borderRadius: "10px",
        fontSize: "1rem",
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
      Upload
      <UploadIcon style={{ marginLeft: "0.5em" }} />
    </Button>
  );
};

export default Upload;
