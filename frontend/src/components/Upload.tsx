import { Button } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import { useContext } from "react";
import { UserContext } from "../userContext";
import axios from "axios";
import toast from "react-hot-toast";

interface PromptResult {
  title: string;
  id: string;
}

interface UploadProps {
  isSmallScreen: boolean;
  update: boolean;
  setUpdate: (update: boolean) => void;
  setPromptResults: (promptResults: PromptResult[] | null) => void;
}

const Upload = ({
  isSmallScreen,
  update,
  setUpdate,
  setPromptResults,
}: UploadProps) => {
  const { userToken } = useContext(UserContext);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPromptResults(null);
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      toast.promise(
        axios
          .post(import.meta.env.VITE_BACKEND_URL + "/api/receivePDF", formData, {
            headers: {
              Authorization: userToken,
              "Content-Type": "multipart/form-data",
            },
            params: {
              fileName: file.name,
            },
          })
          .then((response) => {
            setUpdate(!update);
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
            throw error;
          }),
        {
          loading: "Uploading file...",
          success: "File uploaded successfully!",
          error: (err) => `${err.response.data}`,
        }
      );
    }
  };

  const handleClick = () => {
    const fileInput = document.getElementById("pdf-upload");
    fileInput?.click();
  };

  return (
    <>
      <input
        type="file"
        id="pdf-upload"
        accept=".pdf"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
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
        onClick={handleClick}
      >
        Upload
        <UploadIcon style={{ marginLeft: "0.5em" }} />
      </Button>
    </>
  );
};

export default Upload;
