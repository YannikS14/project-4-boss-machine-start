const express = require('express');
const apiRouter = express.Router();
const {
  getAllMinions,
  getOneMinion,
  postMinion,
  updateMinion,
  deleteMinion,
} = require('./minionsController');
const {
  getAllIdeas,
  getOneIdea,
  postIdea,
  updateIdea,
  deleteIdea,
} = require('./ideasController');
const {
  getAllMeetings,
  postMeeting,
  deleteMeetings,
} = require('./meetingsController');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');
const { getFromDatabaseById } = require('./db');

const validateIdParam = (req, res, next) => {
  const ideaInDb = getFromDatabaseById('ideas', req.params._ideaId);
  if (!ideaInDb) {
    res.status(404).json({ message: 'Idea not found in DB!' });
    return;
  }
  if (!req.params._ideaId || isNaN(req.params._ideaId)) {
    res.status(404).send();
  } else {
    next();
  }
};

apiRouter.route('/minions').get(getAllMinions).post(postMinion);
apiRouter
  .route('/minions/:_minionId')
  .get(getOneMinion)
  .put(updateMinion)
  .delete(deleteMinion);
apiRouter
  .route('/ideas')
  .get(getAllIdeas)
  .post(checkMillionDollarIdea, postIdea);
apiRouter
  .route('/ideas/:_ideaId')
  .get(getOneIdea)
  .put(validateIdParam, checkMillionDollarIdea, updateIdea)
  .delete(deleteIdea);
apiRouter
  .route('/meetings')
  .get(getAllMeetings)
  .post(postMeeting)
  .delete(deleteMeetings);

module.exports = apiRouter;
