const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require('./db');

const getAllMinions = (req, res, next) => {
  const minions = getAllFromDatabase('minions');
  res.status(200).json(minions);
};

const getOneMinion = (req, res, next) => {
  if (req.params._minionId) {
    const minion = getFromDatabaseById(
      'minions',
      req.params._minionId,
    );
    if (!minion) {
      res.status(404).json({
        message: 'Minion ' + req.params._minionId + ' not found!',
      });
    } else {
      res.status(200).json(minion);
    }
  } else {
    res.status(400).json({ message: 'Invalid minion id!' });
  }
};

const postMinion = (req, res, next) => {
  const minionToAdd = req.body;
  if (
    typeof minionToAdd.name !== 'string' ||
    typeof minionToAdd.title !== 'string' ||
    typeof minionToAdd.weaknesses !== 'string' ||
    typeof parseInt(minionToAdd.salary) !== 'number'
  ) {
    res.status(400).json({ message: 'Invalid request body!' });
  } else {
    const response = addToDatabase('minions', minionToAdd);
    res.status(201).json(response);
  }
};

const updateMinion = (req, res, next) => {
  let minionToUpdate = req.body;
  if (
    !req.params._minionId ||
    typeof parseInt(req.params._minionId) !== 'number' ||
    !minionToUpdate.name ||
    !minionToUpdate.title ||
    !minionToUpdate.weaknesses ||
    !minionToUpdate.salary
  ) {
    res.status(404).json({ message: 'Invalid request body!' });
  } else {
    const minion = getFromDatabaseById(
      'minions',
      req.params._minionId,
    );
    minionToUpdate.id = minion.id;
    if (!minion) {
      res.status(404).json({ message: 'Minion not found in DB!' });
    } else {
      const response = updateInstanceInDatabase('minions', req.body);
      res.status(200).json(response);
    }
  }
};

const deleteMinion = (req, res, next) => {
  if (!req.params._minionId) {
    res.status(400).json({ message: 'Invalid request body!' });
  }
  const response = deleteFromDatabasebyId(
    'minions',
    req.params._minionId,
  );
  if (response === true) {
    res.status(204).send();
  } else {
    res.status(404).json({
      message:
        'Minion with ID ' + req.params._minionId + ' not found!',
    });
  }
};

module.exports = {
  getAllMinions,
  getOneMinion,
  postMinion,
  updateMinion,
  deleteMinion,
};
