const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require('./db');

const getAllWork = (req, res, next) => {
  if (
    !req.params._minionId ||
    typeof parseInt(req.params._minionId) !== 'number'
  ) {
    res.status(404).json({ message: 'Invalid request body!' });
  } else {
    const minionInDb = getFromDatabaseById(
      'work',
      req.params._minionId,
    );
    if (!minionInDb) {
      res.status(404).json({ message: 'Work not found in DB!' });
    } else {
      const allWork = getAllFromDatabase('work');
      const workForMinion = allWork.filter((el) => {
        return el.id == req.params._minionId;
      });
      res.status(200).json(workForMinion);
    }
  }
};

const postWork = (req, res, next) => {
  const workToAdd = req.body;
  if (
    typeof workToAdd.title !== 'string' ||
    typeof workToAdd.description !== 'string' ||
    typeof parseInt(workToAdd.hours) !== 'number' ||
    !req.params._minionId ||
    typeof parseInt(req.params._minionId) !== 'number'
  ) {
    res.status(400).json({ message: 'Invalid request body!' });
  } else {
    const response = addToDatabase('work', workToAdd);
    res.status(201).json(response);
  }
};

module.exports = { getAllWork, postWork };
