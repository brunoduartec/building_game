const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: false
  },
  nick: {
    type: String,
    require: false
  },
  subscribedAs:{
    type:String,
    require:false
  },
  helped:{
      type:Boolean,
      require:false
  },
  interacted:{
      type: Boolean,
      require: false
  }
});

module.exports = mongoose.model('participant', userSchema);