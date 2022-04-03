const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

//Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log("Shuting down server due to uncaught exception");
  process.exit(1);
});
//Setting up config file
dotenv.config({ path: "backend/config/config.env" });

//Connecting to database
connectDatabase();
const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server started on port: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});

//Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shuting down the server due to Unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
