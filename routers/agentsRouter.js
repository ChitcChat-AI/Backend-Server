const {Router} = require('express');
const agentsController = require('../controllers/agentsController');
const agentsRouter = new Router();

const {firestoreColListener} = require('../DB/FirebaseColListener')
agentsRouter.get('/:id', ((req, res) => {
    const {id} = req.params;
    firestoreColListener(id);
    res.status(200).send("success");
}));
agentsRouter.post('/', agentsController.createAIAgent);
agentsRouter.put('/', agentsController.updateAIAgent);
agentsRouter.delete('/', agentsController.deleteAIAgent);

module.exports ={agentsRouter};
