import { Box, Grid, Typography } from "@mui/material";
import ArticleIcon from '@mui/icons-material/Article';

interface DocumentsProps {
    isSmallScreen: boolean;
    isMediumScreen: boolean;
}

let example_docs = [];
for (let i = 0; i < 100; i++) {
    example_docs.push({ title: `Document ${i + 1}` });
}

const Documents = ({}: DocumentsProps) => {
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
                {example_docs.map((doc, index) => (
                    <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <ArticleIcon sx={{ fontSize: 100 }} />
                            <Typography variant="body1">{doc.title}</Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Documents;
