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
  const { roaster_id, bean_name, bean_origin, roast_date, brew_details, rating } = req.body;
  const values  = [roaster_id, bean_name, bean_origin, roast_date, brew_details, rating];
  console.log(values)
  const queryText = 'INSERT INTO beans (roaster_id, bean_name, bean_origin, roast_date, brew_details, rating)  VALUES($1, $2, $3, $4, $5, $6)'
  db.query(queryText, values)
    .then(data => {
      console.log(`${bean_name} has been added to the DB`)
      next();
    })
    .catch(err => next({
      log: 'Error in postgresController.getCoffees',
      status: 400,
      message: err,
    }))
};

module.exports = postgresController;
