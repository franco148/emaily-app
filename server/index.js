const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');

require('./services/passport');
// const authRoutes = require('./routes/authRoutes'); // Approach 1
require('./models/User');

mongoose.connect(keys.mongoURI)

const app = express();

// authRoutes(app); // Approach 1
require('./routes/authRoutes')(app); // Approach 2

const PORT = process.env.PORT || 5000;
app.listen(PORT);