const { Categories } = require('../models/CategoriesModel');
const categoriesController = {};

categoriesController.listAllCategories = (req, res, next) => {
  Categories.find({})
    .populate('tags')
    .exec()
    .then(data => {
      res.locals.response = data;
      console.log('categoriesController.listAllCategories:', 'all categories listed')
      next();
    })
    .catch(err => {
      next({
        log: `List All Categories - ERROR: ${err}`,
        message: {
            err: 'Error occured in categoriesController.listAllCategories',
            message: err
        }
      })
    })
}

module.exports = categoriesController;