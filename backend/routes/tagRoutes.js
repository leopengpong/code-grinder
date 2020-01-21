const express = require('express');
const router = express.Router({ mergeParams: true });
const db = require('../models');


router.route('/')
.get(async (req, res, next) => {
  try {
    let tags = await db.Tag.find();
    return res.status(200).json(tags);
  }
  catch (e) {
    return next(e);
  }
})

.post(async (req, res, next) => {
  try {
    let tag = await db.Tag.create({ name: req.body.name });
    return res.status(200).json(tag);
  }
  catch (e) {
    if (e.name === 'MongoError') {
      e.status = 400;
      e.type = 'DuplicateEntryErrror';
    }
    else if (e.name === 'ValidationError') {
      e.status = 400;
      e.type = 'ValidationError'
    }
    return next(e);
  }
});


router.route('/:id')
.delete(async (req, res, next) => {
  try {
    let foundTag = await db.Tag.findById(req.params.id);
    if (foundTag === null) {
      let e = new Error(`Tag with id ${req.params.id} does not exist.`);
      e.type = 'NonexistentEntryError';
      e.status = 400;
      return next(e);
    }
    await db.Tag.deleteOne(foundTag);
    return res.status(200).json(foundTag);
  }
  catch (e) {
    if (e.name === 'CastError') {
      e.status = 400;
      e.type = 'NonexistentEntryError';
    }
    return next(e);
  }
});




module.exports = router;