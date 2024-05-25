const express = require("express");
const sequelize = require("./config/database");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use("/api/users", userRoutes);

// serve static files for frontend react found in frontend/dist
app.use(express.static("frontend/dist"));

app.get("*", (req, res) => {
  res.sendFile("index.html", { root: "frontend/dist" });
});

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
