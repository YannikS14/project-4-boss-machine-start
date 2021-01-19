const express = require('express');
const apiRouter = express.Router();
const {
  getAllMinions,
  getOneMinion,
  postMinion,
  updateMinion,
  deleteMinion,
} = require('./minionsController');
const ideasController = require('./ideasController');
const meetingsController = require('./meetingsController');

apiRouter.route('/minions').get(getAllMinions).post(postMinion);
apiRouter
  .route('/minions/:_minionId')
  .get(getOneMinion)
  .put(updateMinion)
  .delete(deleteMinion);
// apiRouter
//   .route('/ideas')
//   .get(ideasController.getAllIdeas)
//   .post(ideasController.postIdea);
// apiRouter
//   .route('/ideas/:_ideaId')
//   .get(ideasController.getOneIdea)
//   .put(ideasController.updateIdea)
//   .delete(ideasController.deleteIdea);
// apiRouter
//   .route('/meetings')
//   .get(meetingsController.getAllMeetings)
//   .post(meetingsController.postMeeting)
//   .delete(meetingsController.deleteMeeting);

module.exports = apiRouter;
