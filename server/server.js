const express = require('express');
const cors = require('cors');

const app = express();
const path = require('path');
require('./models/db');

require('./auth/auth');

const userRouter = require('./routes/user');
const teamRouter = require('./routes/team');
const resourceRouter = require('./routes/resource');
const commentRouter = require('./routes/comment');
const tagRouter = require('./routes/tag');
const categoryRouter = require('./routes/category');

const PORT = 3000;

app.use(cors());

// HANDLE ASSETS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use('/user', userRouter);
app.use('/teams', teamRouter);
app.use('/resource', resourceRouter);
app.use('/comment', commentRouter);
app.use('/tags', tagRouter);
app.use('/categories', categoryRouter);

// Renders index.html with static assets
app.use(express.static(path.join(__dirname, '../dist')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

// GLOBAL ERROR HANDLER
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log(errorObj.status, errorObj.message);
  return res.status(errorObj.status).send(errorObj.message.err);
});

// RUN SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});
