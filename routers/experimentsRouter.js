const {Router} = require('express');
const experimentsController = require('../controllers/experimentsController');

const experimentsRouter = new Router();

experimentsRouter.get('/:id', experimentsController.getExperimentWithAgentsById);
experimentsRouter.get('/', experimentsController.getExperimentsByResearcherId)
experimentsRouter.post('/', experimentsController.createExperimentWithAgents);
experimentsRouter.put('/status', experimentsController.updateExperimentStatus)
experimentsRouter.put('/', experimentsController.updateExperiment);
experimentsRouter.delete('/', experimentsController.deleteExperiment);

module.exports = {experimentsRouter};



