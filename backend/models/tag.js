const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
    required: true,
    unique: true,
  }
});

const Tag = mongoose.model('Tag', tagSchema);
module.exports = Tag;