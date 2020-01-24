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
  sourceIsLink: {
    type: Boolean,
    required: true
  },

  paramNames: {
    type: [{
      type: String,
      maxlength: 30
    }],
    maxlength: 10
  },
  defaultTests: {
    type: [{
      type: Array,
      maxlength: 10
    }],
    maxlength: 1000,
  },
  tests: {
    type: [{
      type: Array,
      maxlength: 10
    }],
    maxlength: 1000,
  },
  solutions: {
    type: [{
      type: String,
      maxlength: 20000
    }],
    minlength: 5,
    maxlength: 5,
    required: true,
    default: ['', '', '', '', ''],
  }
});

const Problem = mongoose.model('Problem', problemSchema);
module.exports = Problem;