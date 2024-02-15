require("express-async-errors");
require("dotenv").config();
const express = require("express");
const cors=require('cors');

//IMPORTING ROUTES
//auth routes
const authRoutes = require("./routes/authRoutes");
const userRouter=require('./routes/userRoutes');

//UTILS
const pageNotFound = require("./utils/page-not-found");
const errorHandler = require("./utils/error-handler");
//DB-CONNECTION
const connectDb = require("./database/database");

//morgan package ==> a middleware to know what route you are hitting
const morgan = require("morgan");
const cookieParser=require('cookie-parser')
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "views");
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
//use morgan to print req status and route info --> for debugging
app.use(morgan("tiny"));

//cors ploicy check
app.use(cors());

app.use((req,res,next)=>{
  console.log(req.signedCookies);
  next()
})

//routes setup
//auth routes
app.use("/api/v1/auth", authRoutes);

//user routes
app.use("/api/v1/users", userRouter);




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
