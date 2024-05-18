const {Router} = require('express');
const {addParticipantToExperiment} =require('../DB/Queries')
const {sendMailToParticipants} =require('../BuissnessLogic/SendMailToParticipants')
const queries = require("../DB/Queries");
const {APIError} = require("../ErrorHaneling/APIError");

const mailRouter = new Router();

mailRouter.post('/', async (req,res,next) =>{
    try {
        const {exp_id, user_id} = req.body;
        if (!exp_id || !user_id) throw new Error('exp_id and user_id required in request body!');
        await addParticipantToExperiment(exp_id, user_id);
        await sendMailToParticipants(exp_id, 'register');
        res.status(200);
    } catch (err) {
        const apiError = new APIError(err)
        next(apiError, req, res);
    }
} );

module.exports = {mailRouter};