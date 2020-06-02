const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const PORT = 3000;

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);



app.use(express.static('dist'));


app.get('/', (req, res) => {
  res.sendFile('index.html')
})

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
}));




// Serve the files on port 3000.
app.listen(PORT, () => {
	console.log(`Server listening on port: ${PORT}`);
});
