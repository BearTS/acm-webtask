require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const user = require('./routes/auth');
mongoose.connect(process.env.MONGO_URL).then(() => console.log('DB Connection Successfull!')).catch((err) => {console.log(err); });

const app = express();
const port = process.env.PORT || 3000; 
app.use(bodyParser.json());
app.use('/user', user);


app.listen(port, () => {
    console.log('Server is up at ' + port);
});