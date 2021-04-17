const express = require('express');
const categoriesController = require('../controllers/categoriesController');
const router = express.Router();

router.get('/list',
  categoriesController.listAllCategories,
  (req, res) => {
    console.log('list categories route is working');
    // console.log(res.locals.response);
    res.status(200).json(res.locals.response);
  }
);

module.exports = router;