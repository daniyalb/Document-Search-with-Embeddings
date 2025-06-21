import { Box, Typography, Popover, Button } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext, useState, useRef, useEffect } from "react";
import { UserContext } from "../userContext";
import axios from "axios";

interface DocumentProps {
  result: { title: string; id: string };
  update: boolean;
  setUpdate: (update: boolean) => void;
}

const DocumentItem = ({ result, update, setUpdate }: DocumentProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { userToken } = useContext(UserContext);
  const divRef = useRef<HTMLDivElement | null>(null);
  const preventReopenRef = useRef(false);

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (preventReopenRef.current) {
      preventReopenRef.current = false;
      return;
    }
    setAnchorEl(event.currentTarget as unknown as HTMLButtonElement);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    preventReopenRef.current = true;
    setTimeout(() => {
      preventReopenRef.current = false;
    }, 0);
  };

  const handleDeleteDocument = async () => {
    await axios.delete(import.meta.env.VITE_BACKEND_URL + "/api/deleteDocument", {
      headers: {
        Authorization: userToken,
      },
      params: {
        documentId: result.id,
      },
    });
    setUpdate(!update);
    handlePopoverClose();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        handlePopoverClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [divRef]);

  return (
    <div ref={divRef} onClick={handlePopoverOpen}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ArticleIcon
          sx={{
            fontSize: 100,
            ":hover": {
              cursor: "pointer",
            },
          }}
        />
        <Typography variant="body1">{result.title}</Typography>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Button onClick={handleDeleteDocument} startIcon={<DeleteIcon />}>
            Delete Document
          </Button>
        </Popover>
      </Box>
    </div>
  );
};

export default DocumentItem;
