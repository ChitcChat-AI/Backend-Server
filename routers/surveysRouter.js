const {Router} = require('express');
const surveysController = require('../controllers/surveysController');

const surveysRouter = new Router();

surveysRouter.get('/:id', surveysController.getSurveyStatsByExperimentId);
surveysRouter.post('/pre', surveysController.insertAnswerPre);
surveysRouter.post('/post', surveysController.insertAnswerPost);
surveysRouter.post('/pre/is-answer', surveysController.isParticipantAnsweredPre);
surveysRouter.post('/post/is-answer', surveysController.isParticipantAnsweredPost);

module.exports ={surveysRouter};