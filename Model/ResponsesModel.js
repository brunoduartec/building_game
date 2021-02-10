const mongoose = require('mongoose');
const { Schema } = mongoose;

const responseSchema = new Schema({
  word: {
    type: String,
    required: true
  },
  response: {
    type: String,
    require: false
  }
});

module.exports = mongoose.model('responses', responseSchema);