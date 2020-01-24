const mongoose = require('mongoose');


const pw = process.env.MONGODB_PASSWORD;
const database = 'main';
const connectionString = `mongodb+srv://admin:${encodeURIComponent(pw)}@code-grinder-c1-2vmf6.mongodb.net/${database}?retryWrites=true&w=majority`;



mongoose.set('debug', true);
  // this lets us see the actual mongo queries run in the terminal
mongoose.Promise = Promise;
  // specifies promise library (regular js promise)
mongoose.connect(connectionString, {
  keepAlive: true,
  // useMongoClient: true, // not needed in this version
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('connected to mongodb'))
.catch(e => console.log(e));

module.exports.Problem = require('./problem');
module.exports.Tag = require('./tag');