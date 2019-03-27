const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const router = require('./router');

// DB setup
mongoose.connect('mongodb://localhost:27017/auth', { useNewUrlParser: true });
// Suppress deprecation warning about `collection.ensureIndex is deprecated`. It is called internally by mongoose
mongoose.set('useCreateIndex', true);

// App setup
app.use(morgan('combined'));
app.use(bodyParser.json({type: '*/*'}));

// Router setup
router(app);

// Server setup
const port = process.env.port || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server is listening on the port: ', port);