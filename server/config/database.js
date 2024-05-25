const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("postgres", "postgres", "postgres", {
  host: "host.docker.internal",
  port: 5432,
  dialect: "postgres",
});

sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

module.exports = sequelize;
