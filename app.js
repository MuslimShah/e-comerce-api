require("express-async-errors");
require("dotenv").config();
const express = require("express");

//IMPORTING ROUTES
//auth routes
const authRoutes = require("./routes/authRoutes");

//UTILS
const pageNotFound = require("./utils/page-not-found");
const errorHandler = require("./utils/error-handler");
//DB-CONNECTION
const connectDb = require("./database/database");

//morgan package ==> a middleware to know what route you are hitting
const morgan = require("morgan");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "views");
app.use(express.json());
//use morgan to print req status and route info --> for debugging
app.use(morgan("tiny"));

app.use("/api/v1/auth", authRoutes);


//page not found middleware
app.use(pageNotFound);
//error handler middleware
app.use(errorHandler);

const start = async () => {
  try {
    //DB-CONNECTION
    await connectDb(process.env.MONGO_URI);
    console.log("connected to database");
    app.listen(PORT, () => console.log(`CONNECTED ON PORT ${PORT}`));
  } catch (error) {
    console.log("DB connection error");
  }
};
start();
