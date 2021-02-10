// connection.js
const mongoose = require("mongoose");
const connection = "mongodb://mongo:27017/egm21";


// const connectDb = () => {
//  return mongoose.connect(connection);
// };
// module.exports = connectDb;


const options = {
    autoIndex: false, // Don't build indexes
    reconnectTries: 30, // Retry up to 30 times
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
  }

const connectWithRetry = (callback) => {
  console.log('MongoDB connection with retry')
  mongoose.connect(connection, options).then(()=>{
    console.log('MongoDB is connected')
    callback();
  }).catch(err=>{
    console.log('MongoDB connection unsuccessful, retry after 5 seconds.')
    setTimeout(connectWithRetry, 5000)
  })
}

module.exports = connectWithRetry