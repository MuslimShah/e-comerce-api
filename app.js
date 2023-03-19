require('express-async-errors');
require('dotenv');
const express = require('express');
const adminRoutes = require('./routes/admin')
const pageNotFound = require('./utils/page-not-found');
const errorHandler = require('./utils/error-handler');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'views');

app.use(adminRoutes);

//page not found middleware
app.use(pageNotFound);
//error handler middleware
app.use(errorHandler);




app.listen(PORT, () => console.log(`CONNECTED ON PORT ${PORT}`))