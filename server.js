// express, routes and connection to SQL database
const express = require("express");
const routes = require("./routes");
const sequelize = require("./config/connection");

// instintuate App & Port number
const app = express();
const PORT = process.env.PORT || 3001;

// middleWare
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

// turn on connection+server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now Listening on : ${PORT} `));
});
