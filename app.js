/*
| |
| EXPRESS STARTER TEMPLATE |

Hey there, fellow JS developer! If you're looking for a
solid starting point for your next Express project,
you've come to the right place! This starter template
has everything you need to hit the ground running.
Here's what you can expect:
- Dummy routes to get you started
- Express Router for cleaner code
- Custom error classes for bad requests and server errs
- Express-Async-Errors package for async/await error
handling
- Dotenv package for easy environment variable access
- HTTP-Status-Codes package for standardized HTTP codes
- Built using the MVC pattern for organization
Happy coding!
*/


require('express-async-errors');
require('dotenv').config();
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


const start = async() => {
    //write db connection here
    app.listen(PORT, () => console.log(`CONNECTED ON PORT ${PORT}`))
}
start();