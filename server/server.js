const express = require('express');
const PORT = 3000;
const path = require('path')
const bodyParser = require('body-parser');

const posgresController = require('./controllers/postgresController')
const app = express();

/**
 * handle parsing request body
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('./dist', express.static('../dist'));


app.get('/', (req, res) => {
  console.log('hello');
  res.sendFile(path.join(__dirname, '../dist/index.html'))
});

app.post('/add/', posgresController.addCoffee, (req, res) => {
  console.log('add, req.body: ', req.body)
  res.sendFile(path.join(__dirname, '../dist/index.html'))
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
