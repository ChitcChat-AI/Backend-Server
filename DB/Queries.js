const db = require("./DB");
const { options } = require("pg/lib/defaults");

const createExperiment = async (
  name,
  subject,
  prompt,
  status,
  participants
) => {
  const { rows } = await db.query(
    "INSERT INTO experiments (exp_name, exp_subject, exp_provoking_prompt, exp_status, exp_num_participants) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [name, subject, prompt, status, participants]
  );
  return rows[0];
};
const createAIAgent = async (name, sentiment, engLevel, experimentId) => {
  const { rows } = await db.query(
    "INSERT INTO ai_agents (agent_name, sentiment, level_of_engagement, exp_id) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, sentiment, engLevel, experimentId]
  );
  return rows[0];
};

const getAllExperiments = async () => {
  const { rows } = await db.query("SELECT * FROM experiments");
  return rows;
};

const getAllExperimentsWithStudyIdAndName = async () => {
  const { rows } =
    await db.query(`SELECT  e.*, s.study_id, s.study_name FROM experiments e
                                           INNER JOIN study_experiment se ON e.exp_id = se.exp_id
                                           INNER JOIN studies s ON se.study_id = s.study_id;`);
  return rows;
};
const getAllAIAgents = async () => {
  const { rows } = await db.query("SELECT * FROM ai_agents");
  return rows;
};

const getExperimentById = async (id) => {
  const { rows } = await db.query(
    "SELECT * FROM experiments WHERE exp_id = $1",
    [id]
  );
  return rows[0];
};
const getAIAgentById = async (id) => {
  const { rows } = await db.query(
    "SELECT * FROM ai_agents WHERE agent_id = $1",
    [id]
  );
  return rows;
};

const getAIAgentsByExperimentId = async (id) => {
  const { rows } = await db.query("SELECT * FROM ai_agents WHERE exp_id = $1", [
    id,
  ]);
  return rows;
};

const updateExperiment = async (id, name, subject, prompt, status) => {
  const { rows } = await db.query(
    "UPDATE experiments SET exp_name = $1, exp_subject = $2, exp_provoking_prompt= $3, exp_status = $4 " +
      "WHERE exp_id = $5 RETURNING *",
    [name, subject, prompt, status, id]
  );
  return rows;
};
const updateExperimentDynamically = async (newColsArray, experimentId) => {
  const newData = [experimentId];
  const { rows } = await db.query(
    `
    UPDATE experiments
    SET ` +
      newColsArray
        .reduce((acc, [k, v], idx) => {
          newData.push(v);
          return "" + k + " = $" + (idx + 2) + ", ";
        }, "")
        .slice(0, -2) +
      ` WHERE exp_id = $1 RETURNING *`,
    newData
  );
  return rows;
};
const updateAIAgent = async (id, name, sentiment, levelEng) => {
  const { rows } = await db.query(
    "UPDATE ai_agents SET agent_name = $1, sentiment= $2, level_of_engagement = $3 " +
      "WHERE agent_id = $4 RETURNING *",
    [name, sentiment, levelEng, id]
  );
  return rows;
};

const deleteExperiment = async (id) => {
  await db.query("DELETE FROM experiments WHERE exp_id = $1", [id]);
};

const deleteAIAgent = async (id) => {
  await db.query("DELETE FROM ai_agents WHERE agent_id = $1", [id]);
};

const addSurveyAnswerPre = async (exp_id, user_id, opinionPre) => {
  const { rows } = await db.query(
    "INSERT INTO surveys (exp_id, user_id, opinion_pre) VALUES ($1, $2, $3) RETURNING *",
    [exp_id, user_id, opinionPre]
  );
  return rows;
};

const addSurveyAnswerPost = async (exp_id, user_id, optionPost) => {
  const { rows } = await db.query(
    "UPDATE surveys SET opinion_post = $1 WHERE exp_id = $2  AND user_id = $3 RETURNING *",
    [optionPost, exp_id, user_id]
  );
  return rows;
};

const getSurveyStatsById = async (exp_id) => {
  const { rows } = await db.query(
    `SELECT
    count(*) AS count_total,
        COALESCE(sum(case when opinion_pre = 'For' then 1 ELSE 0 end),0) AS count_pre_for,
        COALESCE(sum(case when opinion_pre = 'Against' then 1 ELSE 0 end),0) AS count_pre_against,
        COALESCE(sum(case when opinion_pre = 'Neutral' then 1 ELSE 0 end),0) AS count_pre_neutral,
        COALESCE(sum(case when opinion_post = 'For' then 1 ELSE 0 end),0) AS count_post_for,
        COALESCE(sum(case when opinion_post = 'Against' then 1 ELSE 0 end),0) AS count_post_against,
        COALESCE(sum(case when opinion_post = 'Neutral' then 1 ELSE 0 end),0) AS count_post_neutral
    FROM surveys WHERE exp_id = $1`,
    [exp_id]
  );
  return rows;
};

const getSurveyStatsByParticipants = async (exp_id) => {
  const { rows } = await db.query(
    `SELECT * 
    FROM surveys
    WHERE exp_id = $1`,
    [exp_id]
  );
  return rows;
};

const createResearcher = async (id, name, email, photoURL) => {
  const { rows } = await db.query(
    "INSERT INTO researchers (researcher_id, researcher_name, researcher_email, researcher_photo_url) VALUES ($1, $2, $3, $4) RETURNING *",
    [id, name, email, photoURL]
  );
  return rows[0];
};

const getResearcherById = async (id) => {
  const { rows } = await db.query(
    "SELECT * FROM researchers WHERE researcher_id = $1",
    [id]
  );
  return rows;
};

const updateExperimentStatus = async (expId, newStatus) => {
  const { rows } = await db.query(
    `UPDATE experiments SET exp_status = $2 WHERE exp_id = $1 RETURNING *;`,
    [expId, newStatus]
  );
  return rows[0];
};
const addParticipantToExperiment = async (expId, participantId) => {
  const { rows } = await db.query(
    "INSERT INTO experiment_participant (exp_id, participant_id) VALUES ($1, $2) RETURNING *",
    [expId, participantId]
  );
  return rows[0];
};

const getParticipantsByExperimentId = async (expId) => {
  const { rows } = await db.query(
    `SELECT participant_id FROM experiment_participant
                WHERE exp_id = $1;`,
    [expId]
  );
  return rows;
};

const isParticipantAnswerSurveyPre = async (expId, userId) => {
  const { rows } = await db.query(
    ` SELECT EXISTS (SELECT * FROM surveys
                                WHERE user_id= $1
                                AND exp_id = $2
                                AND opinion_pre IS NOT NULL) as is_pre`,
    [userId, expId]
  );
  return rows;
};
const isParticipantAnswerSurveyPost = async (expId, userId) => {
  const { rows } = await db.query(
    ` SELECT EXISTS (SELECT * FROM surveys
                                WHERE user_id= $1
                                AND exp_id = $2
                                AND opinion_post IS NOT NULL) as is_post`,
    [userId, expId]
  );
  return rows;
};

const isParticipantInExperiment = async (participantId, experimentId) => {
  const { rows } = await db.query(
    ` SELECT EXISTS (SELECT * FROM experiment_participant
                                    WHERE participant_id= $1
                                    AND exp_id = $2) as is_in`,
    [participantId, experimentId]
  );
  return rows;
};

module.exports = {
  createExperiment,
  createAIAgent,
  getAllExperiments,
  getAllAIAgents,
  getExperimentById,
  getAIAgentById,
  updateExperiment,
  updateAIAgent,
  deleteExperiment,
  deleteAIAgent,
  getAIAgentsByExperimentId,
  addSurveyAnswerPre,
  addSurveyAnswerPost,
  getSurveyStatsById,
  createResearcher,
  getResearcherById,
  updateExperimentStatus,
  updateExperimentDynamically,
  getAllExperimentsWithStudyIdAndName,
  addParticipantToExperiment,
  getParticipantsByExperimentId,
  isParticipantAnswerSurveyPre,
  isParticipantAnswerSurveyPost,
  isParticipantInExperiment,
  getSurveyStatsByParticipants,
};
