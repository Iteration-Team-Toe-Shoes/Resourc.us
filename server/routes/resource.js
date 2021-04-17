const express = require('express');
const router = express.Router();

const resourcesController = require('../controllers/resourcesController');
const tagsController = require('../controllers/tagsController');
const teamsController = require('../controllers/teamsController');

router.post('/create',
    resourcesController.createResource,
    tagsController.incrementTagCount,
    teamsController.addResourceToTeam,
    (req, res) => {
        console.log('create resource router is working');
        // console.log(res.locals.response);
        res.status(200).json(res.locals.response);
    }
);

router.post('/list',
    resourcesController.listResources,
    (req, res) => {
        console.log('list resources router is working');
        // console.log(res.locals.response);
        res.status(200).json(res.locals.response);
    }
);

router.post('/listThree',
    resourcesController.listThreeResources,
    (req, res) => {
        console.log('list 3 resources router is working');
        // console.log(res.locals.response);
        res.status(200).json(res.locals.response);
    }
);

router.get('/listAll',
    resourcesController.listAllResources,
    (req, res) => {
        console.log('list all resources router is working');
        // console.log(res.locals.response);
        res.status(200).json(res.locals.response);
    }
);

router.post('/upvote',
    resourcesController.upvoteResource,
    (req, res) => {
        console.log('upvote resource router is working');
        // console.log(res.locals.response);
        res.status(200).json(res.locals.response);
    }
);

router.get('/:id', resourcesController.getResourceById, (req, res) => {
  console.log('get resource by id is working');
  console.log(res.locals.response);
  res.status(200).json(res.locals.response);
});


module.exports = router;