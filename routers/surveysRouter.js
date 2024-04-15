const {Router} = require('express');
const surveysController = require('../controllers/surveysController');

const surveysRouter = new Router();

surveysRouter.get('/:id', surveysController.getSurveyStatsByExperimentId);
surveysRouter.post('/pre', surveysController.insertAnswerPre);
surveysRouter.post('/post', surveysController.insertAnswerPost);

module.exports ={surveysRouter};