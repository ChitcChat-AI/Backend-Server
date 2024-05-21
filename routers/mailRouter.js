const { Router } = require("express");
const { addParticipantToExperiment } = require("../DB/Queries");
const {
  sendMailToParticipant,
} = require("../BuissnessLogic/SendMailToParticipants");
const queries = require("../DB/Queries");
const { APIError } = require("../ErrorHaneling/APIError");
const { registerOrJoin } = require("../constants");
const mailRouter = new Router();
const { logger } = require("./ErrorLogger");

mailRouter.post("/", async (req, res, next) => {
  try {
    logger.info("body: ", exp_id, user_id);
    const { exp_id, user_id } = req.body;
    if (!exp_id || !user_id)
      throw new Error("exp_id and user_id required in request body!");
    await addParticipantToExperiment(exp_id, user_id);
    await sendMailToParticipant(exp_id, user_id, registerOrJoin.REGISTER);
    res.status(200).send("Successfully registered participant to experiment");
  } catch (err) {
    const apiError = new APIError(err);
    next(apiError, req, res);
  }
});

module.exports = { mailRouter };
