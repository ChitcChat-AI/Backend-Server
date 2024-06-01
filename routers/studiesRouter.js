const {Router} = require('express');
const studiesController = require('../controllers/studiesController');

const studiesRouter = new Router();

studiesRouter.get('/',studiesController.getStudiesByResearcherId)
studiesRouter.get('/:id', studiesController.getStudyById);
studiesRouter.get('/experiments/:id', studiesController.getExperimentsByStudyId)
studiesRouter.post('/', studiesController.createStudy);
studiesRouter.put('/', studiesController.updateStudy);
studiesRouter.delete('/', studiesController.deleteStudy);

module.exports ={studiesRouter};