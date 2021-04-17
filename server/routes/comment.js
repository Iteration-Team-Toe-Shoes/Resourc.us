const express = require('express');
const commentsController = require('../controllers/commentsController');
const router = express.Router();

router.post('/create',
  commentsController.createComment,
  (req, res) => {
    console.log('create comment router is working');
    // console.log(res.locals.response);
    res.status(200).json(res.locals.response);
  }
);

router.get('/list', 
  commentsController.listAllComments,
  (req, res) => {
    console.log('list comments route is working');
    // console.log(res.locals.response);
    res.status(200).json(res.locals.response);
  }
)

router.post('/edit',
  commentsController.editComment,
  (req, res) => {
    console.log('edit comments route is working');
    // console.log(res.locals.response);
    res.status(200).json(res.locals.response);
  }
)

router.post('/delete', 
  commentsController.deleteComment, (req, res) => {
  console.log('delete comment route is working');
  // console.log(res.locals.response);
  res.status(200).json(res.locals.response);
});


module.exports = router;