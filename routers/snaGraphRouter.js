const {Router} = require('express');
const snaGraphController = require('../controllers/snaGraphController');

const snaGraphRouter = new Router();

snaGraphRouter.get('/get/:id', snaGraphController.getSnaGraph);
snaGraphRouter.post('/create', snaGraphController.createGraph);
snaGraphRouter.post('/publish', snaGraphController.publishMessage);
snaGraphRouter.get('/get/:collection_id/name/:experiment_name', snaGraphController.getCSV)
snaGraphRouter.get('/get/:id/number/:number', snaGraphController.getMessages)

module.exports ={snaGraphRouter};
