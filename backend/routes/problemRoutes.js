const express = require('express');
const router = express.Router({ mergeParams: true });



router.route('/')
.get(async (req, res, next) => {
  return res.status(200).json({"message": "get"});
})

.post(async (req, res, next) => {
  return res.status(200).json({"message": "post!!!"});
});



router.route('/:id')
.get(async (req, res, next) => {
  return res.status(200).json({"message": "get"});
})

.put(async (req, res, next) => {
  return res.status(200).json({"message": "put!!!"});
})

.delete(async (req, res, next) => {
  return res.status(200).json({"message": "delete!!!"});
});



router.route('/:id/run/:solution')
.get(async (req, res, next) => {
  return res.status(200).json({message: 'get'});
});





module.exports = router;