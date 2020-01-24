require('dotenv').config(); // load env variables
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const problemRoutes = require('./routes/problemRoutes');
const tagRoutes = require('./routes/tagRoutes');


const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(bodyParser.json());


app.use('/api/problem', problemRoutes);
app.use('/api/tag', tagRoutes);





app.use((req, res, next) => {
  let e = new Error('Not Found :(');
  e.status = 404;
  next(e);
});

app.use((err, req, res, next) => {
  //console.log(Object.keys(err));
  //console.log(err.errors);
  return res.status(err.status || 500).json({
    error: { message: err.message || 'internal server error 500' }
  });
});





app.listen(PORT, () => {
  console.clear();
  console.log(`server is listening on port ${PORT}`)
});