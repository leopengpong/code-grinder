const mongoose = require('mongoose');
const Tag = require('./tag');

const problemSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000
  },
  difficulty: {
    type: String,
    enum: ['e', 'm', 'h'],
    required: true
  },
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag'
  }],
  source: {
    type: String,
    maxlength: 200
  },

  paramNames: [{
    type: String,
    maxlength: 30,
    unique: true
  }],
  defaultTests: [Object],
  solutions: {
    type: [String],
    required: true
  }
});

const Problem = mongoose.model('Problem', problemSchema);
module.exports = Problem;