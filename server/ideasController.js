const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require('./db');

const getAllIdeas = (req, res, next) => {
  const ideas = getAllFromDatabase('ideas');
  res.status(200).json(ideas);
};

const getOneIdea = (req, res, next) => {
  if (req.params._ideaId) {
    const idea = getFromDatabaseById('ideas', req.params._ideaId);
    if (!idea) {
      res.status(404).json({
        message: 'Idea ' + req.params._ideaId + ' not found!',
      });
    } else {
      res.status(200).json(idea);
    }
  } else {
    res.status(400).json({ message: 'Invalid idea id!' });
  }
};

const postIdea = (req, res, next) => {
  const ideaToAdd = req.body;
  if (
    typeof ideaToAdd.name !== 'string' ||
    typeof ideaToAdd.description !== 'string' ||
    typeof ideaToAdd.numWeeks !== 'number' ||
    typeof ideaToAdd.weeklyRevenue !== 'number'
  ) {
    res.status(400).json({ message: 'Invalid request body!' });
  } else {
    const response = addToDatabase('ideas', ideaToAdd);
    res.status(201).json(response);
  }
};

const updateIdea = (req, res, next) => {
  let ideaToUpdate = req.body;
  if (
    typeof ideaToUpdate.name !== 'string' ||
    typeof ideaToUpdate.description !== 'string' ||
    typeof ideaToUpdate.numWeeks !== 'number' ||
    typeof ideaToUpdate.weeklyRevenue !== 'number'
  ) {
    res.status(404).json({ message: 'Invalid request body!' });
  } else {
    const idea = getFromDatabaseById('ideas', req.params._ideaId);
    ideaToUpdate.id = idea.id;
    const response = updateInstanceInDatabase('ideas', req.body);
    res.status(200).json(response);
  }
};

const deleteIdea = (req, res, next) => {
  if (
    !req.params._ideaId ||
    typeof parseInt(req.params._ideaId) !== 'number'
  ) {
    res.status(404).json({ message: 'Invalid request body!' });
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
