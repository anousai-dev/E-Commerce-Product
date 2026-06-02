const express = require('express');
const app = express();
const morgan = require('morgan');
const {readdirSync} = require('fs');
const cors = require('cors');

// Middlewares
app.use(cors());
app.use(morgan('dev')); // Log HTTP requests to the console
app.use(express.json()); // Parse JSON request bodies


// routes
readdirSync('./src/services').map((item)=> app.use('/api', require(`./src/services/${item}`)));




// 5001 = env.PORT || 5001
app.listen(5001, () => {
  console.log('Server is running on port 5001');
});