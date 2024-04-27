const {Router} = require('express');
const experimentsController = require('../controllers/experimentsController');

const experimentsRouter = new Router();

experimentsRouter.get('/:id', experimentsController.getExperimentById);
experimentsRouter.get('/', experimentsController.getAllExperiments)
experimentsRouter.post('/', experimentsController.createExperimentWithAgents);
experimentsRouter.put('/', experimentsController.updateExperiment);
experimentsRouter.delete('/', experimentsController.deleteExperiment);

module.exports ={experimentsRouter};