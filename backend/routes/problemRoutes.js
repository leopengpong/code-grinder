const express = require('express');
const router = express.Router({ mergeParams: true });
const db = require('../models');
const { badRequest } = require('../utils');



router.route('/')
.get(async (req, res, next) => {
  return res.status(200).json({"message": "get"});
})

.post(async (req, res, next) => {
  try {
    // validation
    if (!['e', 'm', 'h'].includes(req.body.difficulty))
      return next(badRequest('Difficulty must be "e", "m", or "h"'));
    if (Array.isArray(req.body.paramNames) && (new Set(req.body.paramNames)).size !== req.body.paramNames.length)
      return next(badRequest('paramNames must be unique.'));
    if (Array.isArray(req.body.paramNames) && !req.body.paramNames.every(name =>
        name.toLowerCase().split('').every(c => c.charCodeAt(0) <= 122 && c.charCodeAt(0) >= 96)))
      return next(badRequest('paramNames must be a-z or A-Z.'));

    let numProblems = await db.Problem.countDocuments({}, (e, count) => count);
    let solution = `let solution = (${req.body.paramNames.join(', ')}) => {\n  // your solution\n};`;
    let problem = await db.Problem.create({
      id: numProblems+1,
      ...req.body,
      solutions: [solution, solution, solution, solution, solution],
      tests: req.body.defaultTests,
    });
    return res.status(200).json(problem);
  }
  catch (e) {
    if (e.name === 'MongoError')
      return next(badRequest('There is already a problem with this name.'));
    return next(e);
  }
});



router.route('/:id')
.get(async (req, res, next) => {
  try {
    let problem = await db.Problem.findById(req.params.id);
    if (problem === null)
      return next(badRequest('Problem with that ID does not exist.'));
    return res.status(200).json(problem);
  }
  catch (e) {
    if (e.name === 'CastError')
      return next(badRequest('Problem ID is badly formatted. And no, there is no problem object with that ID.'));
    return next(e);
  }
})

.put(async (req, res, next) => {
  try {
    // validation
    let problem = await db.Problem.findById(req.params.id);
    if (problem === null)
      return next(badRequest('Problem with that ID does not exist.'));
    if (req.body.difficulty !== undefined && !['e', 'm', 'h'].includes(req.body.difficulty))
      return next(badRequest('Difficulty must be "e", "m", or "h"'));
    if (Array.isArray(req.body.paramNames) && (new Set(req.body.paramNames)).size !== req.body.paramNames.length)
      return next(badRequest('paramNames must be unique.'));
    if (Array.isArray(req.body.paramNames) && !req.body.paramNames.every(name => name instanceof String &&
        name.toLowerCase().split('').every(c => c.charCodeAt(0) <= 122 && c.charCodeAt(0) >= 96)))
      return next(badRequest('paramNames must be a-z or A-Z.'));
    if (Array.isArray(req.body.solutions) && req.body.solutions.length !== problem.solutions.length)
      return next(badRequest('Solutions array is badly formatted.'));
    
    if (Array.isArray(req.body.solutions))  // update solutions array
      problem.solutions.forEach((sol, i) => {
        if (null !== req.body.solutions[i])
          problem.solutions[i] = req.body.solutions[i];
      });

    let numProblems = await db.Problem.countDocuments({}, (e, count) => count);
    let updatedProblem = await db.Problem.findByIdAndUpdate(req.params.id, {
      id: numProblems+1,
      ...req.body,
      solutions: problem.solutions 
    }, {new: true});
    return res.status(200).json(updatedProblem);
  }
  catch (e) {
    if (e.name === 'MongoError')
      return next(badRequest('There is already a problem with this name.'));
    return next(e);
  }
})

.delete(async (req, res, next) => {
  try {
    let foundProblem = await db.Problem.findById(req.params.id);
    if (foundProblem === null)
      return next(badRequest('Cannot delete a nonexistent problem.'));
    await db.Problem.deleteOne(foundProblem);
    return res.status(200).json(foundProblem);
  }
  catch (e) {
    if (e.name === 'CastError')
      return next(badRequest('Problem ID is incorrectly formatted. And no, there is no problem with that ID.'))
    return next(e);
  }
});



router.route('/:id/run/:solutionNum')
.get(async (req, res, next) => {
  try {
    let problem = await db.Problem.findById(req.params.id);
    if (problem === null)
      return next(badRequest('Problem with that ID does not exist.'));
    if (req.params.solutionNum >= problem.solutions.length)
      return next(badRequest('solutionNum must be a valid index.'));

    let f = Function(...problem.paramNames, 
        `${problem.solutions[req.params.solutionNum]} return solution(${problem.paramNames.join(',')})`)
    let results = problem.tests.map(t => {
      let args = []
      for (let i = 0; i < problem.paramNames.length; ++i)
        args.push(t[i])
      return f(...args);
    });

    return res.status(200).json(results);
  }
  catch (e) {
    if (e.name === 'CastError')
      return next(badRequest('Problem ID is badly formatted. And no, there is no problem object with that ID.'));
    return next(e);
  }
});





module.exports = router;