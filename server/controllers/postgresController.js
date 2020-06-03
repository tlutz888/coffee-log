const db = require('../models/coffeeModels');

const postgresController  = {};

postgresController.addCoffee = (req, res, next) => {
  console.log('in postgresController.addCoffee, req.body: ', req.body)
  next();
};

module.exports = postgresController;
