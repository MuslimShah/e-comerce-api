/*=============================================
=                   Import Section                   =
=============================================*/

require("express-async-errors");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
//*Security packages
const rateLimiter = require("express-rate-limit");
const xssClean = require("xss-clean");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");

//IMPORTING ROUTES
//auth routes
const authRoutes = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const reviewsRoutes = require("./routes/reviewsRoutes");
const orderRoutes = require("./routes/orderRoutes");

//UTILS
const pageNotFound = require("./middleware/page-not-found");
const errorHandler = require("./middleware/error-handler");
//DB-CONNECTION
const connectDb = require("./database/database");

//morgan package ==> a middleware to know which route you are hitting
const morgan = require("morgan");
const User = require("./models/user");
const cookieParser = require("cookie-parser");

/*============  End of Import Section  =============*/

/*=============================================
=                   Using MiddleWares                   =
=============================================*/

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet());
app.use(xssClean());
app.use(mongoSanitize());
app.use(express.json());
app.use(express.static("./public"));
//file upload
app.use(fileUpload());
app.use(cookieParser(process.env.COOKIE_SECRET));
//use morgan to print req status and route info --> for debugging
app.use(morgan("tiny"));
//cors ploicy check
app.use(cors());
/*============  End of Using MiddleWares  =============*/

/*=============================================
=                   Handling Routes                   =
=============================================*/

//auth routes
app.use("/api/v1/auth", authRoutes);

//user routes
app.use("/api/v1/users", userRouter);

//product routes
app.use("/api/v1/products", productRouter);

//reviews routes
app.use("/api/v1/reviews", reviewsRoutes);

//order routes
app.use("/api/v1/orders", orderRoutes);

/*============  End of Handling Routes  =============*/

//page not found middleware
app.use(pageNotFound);
//error handler middleware
app.use(errorHandler);

/*=============================================
=                   Starting Server                   =
=============================================*/

const start = async () => {
  try {
    //DB-CONNECTION
    await connectDb(process.env.MONGO_URI);
    console.log("connected to database");
    app.listen(PORT, "0.0.0.0", () => console.log(`CONNECTED ON PORT ${PORT}`));
  } catch (error) {
    console.log("DB connection error");
  }
};
start();

/*============  End of Starting Server  =============*/
