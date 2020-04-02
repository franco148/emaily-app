const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

require('./models/User');
require('./services/passport');
// const authRoutes = require('./routes/authRoutes'); // Approach 1


mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Emaily service has connected to MongoDB Cluster successfuly...');
    })
    .catch(error => {
        console.log('Something bad ocurred: ', error);
    });

const app = express();
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

// authRoutes(app); // Approach 1
require('./routes/authRoutes')(app); // Approach 2

const PORT = process.env.PORT || 5000;
app.listen(PORT);