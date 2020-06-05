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
      return next();
    })
    .catch(err => next({
      log: 'Error in postgresController.getCoffees',
      status: 400,
      message: err,
    }));
};

postgresController.deleteCoffee = (req, res, next) => {
  console.log('deleting coffee');
  console.log('in postgresController.deleteCoffee, req.body: ', req.body);

  const {coffeeId } = req.body;
  console.log(coffeeId);
  const values = [coffeeId];
  const queryText = 'DELETE FROM beans WHERE _id = ($1)';
  db.query(queryText, values)
    .then(data => {
      console.log(`coffeeId: ${coffeeId} has been deleted`);
      return next();
    })
    .catch(err => next({
      log: 'Error in postgresController.deleteCoffee',
      status: 400,
      message: err,
    }));
}
postgresController.getRoasters = (req, res, next) => {
  console.log('getting roasters')
  db.query('SELECT * FROM "public"."roasters";')
    .then(data => {
      console.log(data.rows)
      res.locals.roasters = data.rows;
      return next()
    })
    .catch(err => next({
      log: 'Error in postgresController.getRoasters',
      status: 400,
      message: err,
    }));
}

postgresController.addRoaster = (req, res, next) => {
  console.log('adding roaster: ', req.body);
  const { name } = req.body;
  const values = [name];
  const queryText = 'INSERT INTO roasters (name) VALUES ($1);';
  db.query(queryText, values)
  .then(data => {
    console.log(`${ name } has been added to the DB`)
    return next();
  })
  .catch(err => next({
    log: 'Error in postgresController.getCoffees',
    status: 400,
    message: err,
  }));
}

module.exports = postgresController;
