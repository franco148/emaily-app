const mongoose = require('mongoose');
// const Schema = mongoose.Schema; // Old Version
const { Schema } = mongoose; // New ES6 Version

const userSchema = new Schema({
    googleId: String,
    credits: { type: Number, default: 0 }
});

mongoose.model('users', userSchema);
