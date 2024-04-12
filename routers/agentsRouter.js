const {Router} = require('express');
const agentsController = require('../controllers/agentsController');

const agentsRouter = new Router();

agentsRouter.get('/:id', agentsController.getAIAgentsByExperimentId);
agentsRouter.post('/', agentsController.createAIAgent);
agentsRouter.put('/', agentsController.updateAIAgent);
agentsRouter.delete('/', agentsController.deleteAIAgent);

module.exports ={agentsRouter};