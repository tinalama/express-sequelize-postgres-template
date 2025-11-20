const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const errorHandler = require("errorhandler");
const db = require("./models");
// const routes = require("./routes/index");

require ('dotenv').config({path: './.env'});

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(logger("tiny"));

app.set("port", port || 3000);
app.set("env", process.env.NODE_ENV || "development");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//use this to navigate to the index of the rotues file's index
//app.use('api/v1', routes)

app.get("/", (req, res) => {
  res.send("Welcome!!!!!");
});

//    * * Error Handler: Development Only
//  * Provides full stack trace in development mode.
//  */
if (app.get("env") === "development") {
  // Only use errorhandler in development
  app.use(errorHandler());
}

// Final Custom Error Handler Middleware (Catches all uncaught errors)
app.use((err, _req, res, next) => {
  if (!err) {
    next();
    return;
  }

  // Log the full error stack in non-production environments
  if (app.get("env") !== "production") {
    console.error("SERVER ERROR:", err.stack);
  }

  // Send a structured JSON error response
  // Hides the internal error object unless in development mode
  return res.status(err?.statusCode || err?.status || 500).json({
    message: err?.message || "Internal Server Error",
    error: app.get("env") === "development" ? err : {},
  });
});

(async () => {
  try {
    // 1. Authenticate Sequelize Connection
    // Uses the credentials in your config.js to connect to the DB
    await db.sequelize.authenticate();
    console.log("PostgreSQL connection established successfully.");

    // 2. Start the Server
    // Server only starts if DB connection is successful
    app.listen(app.get("port"), () =>
      console.log(
        `Server running on port ${app.get("port")} in ${app.get("env")} mode`
      )
    );
  } catch (err) {
    // If DB authentication fails, log the error and stop the process
    console.error("❌ Failed to start server and connect to DB:", err.message);
    process.exit(1);
  }
})();
