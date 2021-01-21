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
      'minions',
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

const updateWork = (req, res, next) => {
  let workToUpdate = req.body;
  if (
    typeof workToUpdate.id !== 'string' ||
    typeof workToUpdate.title !== 'string' ||
    typeof workToUpdate.description !== 'string' ||
    typeof parseInt(workToUpdate.hours) !== 'number' ||
    !req.params._minionId ||
    typeof parseInt(req.params._minionId) !== 'number' ||
    !req.params._workId ||
    typeof parseInt(req.params._workId) !== 'number'
  ) {
    res.status(404).json({ message: 'Invalid request body!' });
  } else {
    const work = getFromDatabaseById('work', req.params._workId);
    if (!work) {
      res.status(404).json({ message: 'Work not found in DB!' });
    } else if (work.minionId !== req.params._minionId) {
      res
        .status(400)
        .json({ message: "Work doesn't belong to this minion" });
    } else {
      const response = updateInstanceInDatabase('work', req.body);
      res.status(200).json(response);
    }
  }
};

const deleteWork = (req, res, next) => {
  if (!req.params._minionId || !req.params._workId) {
    res.status(400).json({ message: 'Invalid request body!' });
  }
  const response = deleteFromDatabasebyId('work', req.params._workId);
  if (response === true) {
    res.status(204).send();
  } else {
    res.status(404).json({
      message: 'Work with ID ' + req.params._workId + ' not found!',
    });
  }
};

module.exports = { getAllWork, postWork, updateWork, deleteWork };
