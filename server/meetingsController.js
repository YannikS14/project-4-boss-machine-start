const {
  createMeeting,
  getAllFromDatabase,
  deleteAllFromDatabase,
  addToDatabase,
} = require('./db');

const getAllMeetings = (req, res, next) => {
  const meetings = getAllFromDatabase('meetings');
  res.status(200).json({
    message: 'Fetched all meetings from DB!',
    data: meetings,
  });
};

const postMeeting = (req, res, next) => {
  const meetingToAdd = createMeeting();
  const response = addToDatabase('meetings', meetingToAdd);
  res
    .status(201)
    .json({ message: 'Meeting created!', data: response });
};

const deleteMeetings = (req, res, next) => {
  const response = deleteAllFromDatabase('meetings');
  if (response.length === 0) {
    res.status(204).send();
  } else {
    res.status(500).send({ message: 'Failed to delete meetings!' });
  }
};

module.exports = {
  getAllMeetings,
  postMeeting,
  deleteMeetings,
};
