const express = require('express');
const app = express();
const morgan = require('morgan');
const {readdirSync} = require('fs');
const cors = require('cors');
require("dotenv").config();

const port = process.env.PORT || 5001;

// Middlewares
app.use(cors());
app.use(morgan('dev')); // Log HTTP requests to the console
app.use(express.json()); // Parse JSON request bodies


// routes
readdirSync('./src/router').map((item)=> app.use('/api', require(`./src/router/${item}`)));



// 5001 = env.PORT || 5001
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});