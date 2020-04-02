const mongoose = require('mongoose');
// const Schema = mongoose.Schema; // Old Version
const { Schema } = mongoose; // New ES6 Version

const userSchema = new Schema({
    googleId: String
});

mongoose.model('users', userSchema);