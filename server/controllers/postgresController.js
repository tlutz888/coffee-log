const db = require('../models/coffeeModels');

const postgresController  = {};

postgresController.getCoffees = (req, res, next) => {
  const queryText = 'SELECT * FROM "public"."beans";'
  db.query(queryText)
    .then(data => {
      res.locals.data = data.rows;
      return next()
    })
    .catch(err => next({
      log: 'Error in postgresController.getCoffees',
      status: 400,
      message: err,
    }))
};

postgresController.addCoffee = (req, res, next) => {
  console.log('in postgresController.addCoffee, req.body: ', req.body)
  next();
};

module.exports = postgresController;
