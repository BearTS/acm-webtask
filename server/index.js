require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const user = require('./routes/auth');
const expense = require('./routes/expense');
const path = require('path');
mongoose.connect(process.env.MONGO_URL).then(() => console.log('DB Connection Successfull!')).catch((err) => {console.log(err); });

const app = express();
const port = process.env.PORT || 3000; 
app.use(express.static(path.join(__dirname, '../public/')));
app.use(bodyParser.json());
app.use('/user', user);
app.use('/expense', expense);


app.listen(port, () => {
    console.log('Server is up at ' + port);
});