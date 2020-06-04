const express = require('express');
const PORT = 3000;
const path = require('path')
// const bodyParser = require('body-parser');
const cors = require('cors');


const postgresController = require('./controllers/postgresController')
const app = express();

/**
 * handle parsing request body
 */
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('./dist', express.static('../dist'));


app.get('/', (req, res) => {
  console.log('hello');
  res.sendFile(path.join(__dirname, '../client/index.html'))
});

app.get('/api', postgresController.getCoffees, (req, res) => {
  console.log('at /api ');
  res.status(200).json(res.locals.data);
})


app.post('/api', postgresController.addCoffee, (req, res) => {
  // console.log('add, req.body: ', req.body)
  res.status(201).json('coffee, added!');
})

app.delete('/api', postgresController.deleteCoffee, (req, res) => {
  // res.status(200).json(`working on stuff`)

  res.sendStatus(204)
  // .json(`coffee ID: ${res.body.coffeeID} deleted from DB`)
})

app.use((req, res) => res.sendStatus(404));


app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// Serve the files on port 3000.
app.listen(PORT, () => {
	console.log(`Server listening on port: ${PORT}`);
});
