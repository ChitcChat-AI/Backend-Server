const queries = require("../DB/Queries");
const { APIError } = require("../ErrorHaneling/APIError");

const isParticipantInExperiment = async (req, res, next) => {
  try {
    const participant_id = req.params.id;
    const experiment_id = req.params.exp_id;
    res
      .status(200)
      .json(
        await queries.isParticipantInExperiment(participant_id, experiment_id)
      );
  } catch (err) {
    const apiError = new APIError(err);
    next(apiError, req, res);
  }
};

module.exports = {
  isParticipantInExperiment,
};
