require('express-async-errors');
require('dotenv').config();
const express = require('express');
const adminRoutes = require('./routes/admin')
const pageNotFound = require('./utils/page-not-found');
const errorHandler = require('./utils/error-handler');
const connectDb=require('./database/database');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'views');

app.use((req,res,next)=>{
    console.log(req.url);
    req.next()
   
})
app.use('/api/v1/',adminRoutes);

//page not found middleware
app.use(pageNotFound);
//error handler middleware
app.use(errorHandler);


const start = async() => {
    try {
        //write db connection here
    await connectDb(process.env.MONGO_URI);
    console.log('connected to database');
    app.listen(PORT, () => console.log(`CONNECTED ON PORT ${PORT}`))
    } catch (error) {
        console.log('DB connection error');
        
    }
}
start();