const {Router} = require('express');
const researcherController = require('../controllers/researchersController');

const researcherRouter = new Router();

researcherRouter.get('/:id', researcherController.getResearcherById);
researcherRouter.post('/', researcherController.createResearcher);

export default researcherRouter;