const checkMillionDollarIdea = (req, res, next) => {
  const idea = req.body;
  if (idea.weeklyRevenue * idea.numWeeks >= 1000000) {
    req.isMillionDollarIdea = true;
  } else {
    res.status(400).send();
    return;
  }
  next();
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
