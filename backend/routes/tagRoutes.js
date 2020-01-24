const express = require('express');
const router = express.Router({ mergeParams: true });
const db = require('../models');
const { badRequest } = require('../utils');


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
    if (e.name === 'MongoError')
      return next(badRequest('There is already a tag with that name.'));
    else if (e.name === 'ValidationError')
      return next(badRequest('Tag names must be 50 characters or fewer.'));
    return next(e);
  }
});


router.route('/:id')
.delete(async (req, res, next) => {
  try {
    let foundTag = await db.Tag.findById(req.params.id);
    if (foundTag === null)
      return next(badRequest('Cannot delete a nonexistent tag.'));
    await db.Tag.deleteOne(foundTag);
    return res.status(200).json(foundTag);
  }
  catch (e) {
    if (e.name === 'CastError')
      return next(badRequest('Tag ID is incorrectly formatted. And no, there is no tag with that ID.'))
    return next(e);
  }
});




module.exports = router;