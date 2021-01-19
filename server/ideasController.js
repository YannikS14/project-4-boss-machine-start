const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require('./db');

const getAllIdeas = (req, res, next) => {
  const ideas = getAllFromDatabase('ideas');
  res
    .status(200)
    .json({ message: 'Fetched all ideas from DB!', data: ideas });
};

const getOneIdea = (req, res, next) => {
  if (req.params._ideaId) {
    const idea = getFromDatabaseById('ideas', req.params._ideaId);
    if (!idea) {
      res.status(404).json({
        message: 'Idea ' + req.params._ideaId + ' not found!',
      });
    } else {
      res.status(200).json({
        message: 'Fetched idea ' + req.params._ideaId + ' from DB!',
        data: idea,
      });
    }
  } else {
    res.status(400).json({ message: 'Invalid idea id!' });
  }
};

const postIdea = (req, res, next) => {
  const ideaToAdd = req.body;
  if (
    !ideaToAdd.name ||
    !ideaToAdd.description ||
    !ideaToAdd.numWeeks ||
    !ideaToAdd.weeklyRevenue
  ) {
    res.status(400).json({ message: 'Invalid request body!' });
  } else {
    const response = addToDatabase('ideas', ideaToAdd);
    res
      .status(201)
      .json({ message: 'Added new idea!', data: response });
  }
};

const updateIdea = (req, res, next) => {
  let ideaToUpdate = req.body;
  if (
    !req.params._ideaId ||
    !ideaToUpdate.name ||
    !ideaToUpdate.description ||
    !ideaToUpdate.numWeeks ||
    !ideaToUpdate.weeklyRevenue
  ) {
    res.status(400).json({ message: 'Invalid request body!' });
  } else {
    const idea = getFromDatabaseById('ideas', req.params._ideaId);
    ideaToUpdate.id = idea.id;
    if (!idea) {
      res.status(404).json({ message: 'Idea not found in DB!' });
    } else {
      const response = updateInstanceInDatabase('ideas', req.body);
      console.log(response);
      res
        .status(200)
        .json({ message: 'Updated idea!', data: response });
    }
  }
};

const deleteIdea = (req, res, next) => {
  if (!req.params._ideaId) {
    res.status(400).json({ message: 'Invalid request body!' });
  }
  const response = deleteFromDatabasebyId(
    'ideas',
    req.params._ideaId,
  );
  if (response === true) {
    res.status(204).send();
  } else {
    res.status(404).json({
      message: 'Idea with ID ' + req.params._ideaId + ' not found!',
    });
  }
};

module.exports = {
  getAllIdeas,
  getOneIdea,
  postIdea,
  updateIdea,
  deleteIdea,
};
