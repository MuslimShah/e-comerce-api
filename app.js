const express = require('express');
const adminRoutes = require('./routes/admin')
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'views');

app.use(adminRoutes)

app.listen(PORT, () => console.log(`CONNECTED ON PORT ${PORT}`))