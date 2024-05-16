const {Router} = require('express');
const agentsController = require('../controllers/agentsController');
const agentsRouter = new Router();

const {firestoreColListener} = require('../DB/FirebaseColListener')
agentsRouter.get('/:id', agentsController.getAgentById);
agentsRouter.get('/experiment/:id', agentsController.getAgentsByExperimentId)
agentsRouter.post('/', agentsController.createAgent);
agentsRouter.put('/', agentsController.updateAgent);
agentsRouter.delete('/', agentsController.deleteAgent);

module.exports ={agentsRouter};
