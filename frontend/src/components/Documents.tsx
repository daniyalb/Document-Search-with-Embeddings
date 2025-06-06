import { Box, Grid, Typography, Skeleton, colors } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../userContext";
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
      .get(import.meta.env.VITE_BACKEND_URL + "/api/getDocuments", {
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

  const getBannerText = (index: number) => {
    switch (index) {
      case 0:
        return "Best Match";
      case 1:
        return "2nd Best Match";
      case 2:
        return "3rd Best Match";
      case 3:
        return "4th Best Match";
      case 4:
        return "5th Best Match";
      default:
        return "";
    }
  };

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
            <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={index}>
              <Box sx={{ position: "relative", marginLeft: "1em" }}>
                {index < 3 && (
                  <Typography
                    variant="caption"
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      backgroundColor: index === 0 ? "#9F03B8" : "rgba(0, 0, 0, 0.7)",
                      color: "white",
                      padding: "0.2em 0.5em",
                      borderRadius: "0.5em",
                      zIndex: 1,
                    }}
                  >
                    {getBannerText(index)}
                  </Typography>
                )}
                <DocumentItem
                  result={result}
                  update={update}
                  setUpdate={setUpdate}
                />
              </Box>
            </Grid>
          ))
        ) : documents && documents.length > 0 ? (
          documents.map((doc, index) => (
            <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={index}>
              <DocumentItem
                result={doc}
                update={update}
                setUpdate={setUpdate}
              />
            </Grid>
          ))
        ) : documents === null ? (
          [...Array(3)].map((_, index) => (
            <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={index}>
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
          <Grid>
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