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

apiRouter.route('/minions').get(getAllMinions).post(postMinion);
apiRouter
  .route('/minions/:_minionId')
  .get(getOneMinion)
  .put(updateMinion)
  .delete(deleteMinion);
apiRouter.route('/ideas').get(getAllIdeas).post(postIdea);
apiRouter
  .route('/ideas/:_ideaId')
  .get(getOneIdea)
  .put(updateIdea)
  .delete(deleteIdea);
apiRouter
  .route('/meetings')
  .get(getAllMeetings)
  .post(postMeeting)
  .delete(deleteMeetings);

module.exports = apiRouter;
