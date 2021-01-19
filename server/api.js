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
const meetingsController = require('./meetingsController');

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
// apiRouter
//   .route('/meetings')
//   .get(meetingsController.getAllMeetings)
//   .post(meetingsController.postMeeting)
//   .delete(meetingsController.deleteMeeting);

module.exports = apiRouter;
