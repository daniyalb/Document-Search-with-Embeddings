import { Box, Grid, Typography, Skeleton, colors } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../App";
import toast from "react-hot-toast";
import DocumentItem from "./DocumentItem";

interface PromptResult {
  title: string;
  id: string;
}

interface DocumentsProps {
  isSmallScreen: boolean;
  isMediumScreen: boolean;
  update: boolean;
  promptResults: PromptResult[] | null;
  setUpdate: (update: boolean) => void;
}

const Documents = ({ update, promptResults, setUpdate }: DocumentsProps) => {
  const { userToken } = useContext(UserContext);
  const [documents, setDocuments] = useState<
    null | { title: string; id: string }[]
  >(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/getDocuments", {
        headers: {
          Authorization: userToken,
        },
      })
      .then((response) => {
        setDocuments(response.data.documents);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to fetch documents. Please try again later.");
      });
  }, [update, userToken]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        outline: "1px solid rgba(255, 255, 255, 0.2)",
        borderRadius: "3em",
        background:
          "radial-gradient(circle at bottom right, rgba(78, 1, 108, 0.7), rgba(2, 15, 129, 0.7))",
        backdropFilter: "blur(10px)",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        width: "90%",
        height: "100%",
        paddingTop: "2em",
        overflowY: "auto",
        scrollbarWidth: "none",
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      }}
    >
      <Grid container spacing={2} sx={{ flexWrap: "wrap" }}>
        {Array.isArray(promptResults) ? (
          promptResults.map((result, index) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
              <DocumentItem
                result={result}
                update={update}
                setUpdate={setUpdate}
              />
            </Grid>
          ))
        ) : documents && documents.length > 0 ? (
          documents.map((doc, index) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
              <DocumentItem
                result={doc}
                update={update}
                setUpdate={setUpdate}
              />
            </Grid>
          ))
        ) : documents === null ? (
          [...Array(3)].map((_, index) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Skeleton
                  variant="rectangular"
                  width={90}
                  height={90}
                  sx={{
                    borderRadius: "10px",
                    marginBottom: "0.5em",
                    backgroundColor: colors.grey[500],
                  }}
                />
                <Skeleton
                  variant="text"
                  width={100}
                  height={30}
                  sx={{ backgroundColor: colors.grey[500] }}
                />
              </Box>
            </Grid>
          ))
        ) : (
          <Grid item>
            <Typography variant="h6" sx={{ color: "white", mt: 2, ml: 6 }}>
              No documents found. Please upload a document.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Documents;
