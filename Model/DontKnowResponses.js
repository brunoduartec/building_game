const mongoose = require('mongoose');
const { Schema } = mongoose;

const responseSchema = new Schema({
  response: {
    type: String,
    require: false
  }
});

module.exports = mongoose.model('dontknow', responseSchema);