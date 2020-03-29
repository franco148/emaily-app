const express = require('express');
require('./services/passport');
// const authRoutes = require('./routes/authRoutes'); // Approach 1

const app = express();

// authRoutes(app); // Approach 1
require('./routes/authRoutes')(app); // Approach 2

const PORT = process.env.PORT || 5000;
app.listen(PORT);