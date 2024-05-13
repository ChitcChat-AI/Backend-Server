const db = require("../DB");

const createAgent = async (agent_name, sentiment, opinion_alignment, talking_style, activity_level, topics_of_interest, messages_to_reply) => {
    const {rows} = await db.query(
        "INSERT INTO agents (agent_name, sentiment, opinion_alignment, talking_style, activity_level, topics_of_interest, messages_to_reply ) VALUES ($1, $2, $3, $4, $5, $6 :: TEXT[], $7) RETURNING *",
        [agent_name,sentiment, opinion_alignment, talking_style, activity_level, topics_of_interest, messages_to_reply]
    );

    return rows[0];
}

const jointAgentToExperiment = async (exp_id, agent_id) =>{
    const {rows} = await db.query(
        "INSERT INTO experiment_agent (exp_id, agent_id) VALUES ($1, $2) RETURNING *",
        [exp_id, agent_id]
    );
    return rows[0];
}

const getAgentById = async (agent_id) => {
    const {rows} = await db.query(
        "SELECT * FROM agents WHERE agent_id = $1",
        [agent_id]
    );
    return rows[0];
}

const getExperimentWithAgentsAsJson  = async (exp_id) =>{
    const {rows} = await db.query(
        `SELECT * FROM (
            SELECT CASE WHEN EXISTS(SELECT * FROM experiment_agent WHERE exp_id = $1 AND agent_id  IS NOT NULL)
                            THEN
                            (SELECT json_build_object(
                                'exp', json_build_object(
                                    'exp_id', e.exp_id,
                                    'exp_subject', e.exp_subject,
                                    'exp_provoking_prompt',  e.exp_provoking_prompt,
                                    'exp_num_participants', e.exp_num_participants,
                                    'exp_crated_at', e.exp_created_at,
                                    'exp_status', e.exp_status,
                                    'exp_name',e.exp_name,
                                    'exp_messages_col_id', e.exp_messages_col_id,
                                    'study_id', s.study_id,
                                    'study_name', s.study_name
                                ),
                                'agents', json_agg( json_build_object(
                                    'agent_id', a.agent_id,
                                    'agent_name', a.agent_name,
                                    'sentiment', a.sentiment,
                                    'opinion_alignment', a.opinion_alignment,
                                    'talking_style', a.talking_style,
                                    'activity_level', a.activity_level,
                                    'topics_of_interest',a.topics_of_interest,
                                    'messages_to_reply', a.messages_to_reply
                                ))) as exp_agents
                            FROM experiments e
                            INNER JOIN study_experiment se ON se.exp_id = e.exp_id
                            INNER JOIN studies s ON s.study_id = se.study_id
                            INNER JOIN experiment_agent  ON experiment_agent.exp_id = e.exp_id
                            INNER JOIN agents a ON experiment_agent.agent_id = a.agent_id
                            GROUP BY e.exp_id, experiment_agent.exp_id, s.study_id
                            HAVING experiment_agent.exp_id = $1)
                            ELSE
                            (SELECT json_build_object(
                                'exp', json_build_object(
                                    'exp_id', e.exp_id,
                                    'exp_subject', e.exp_subject,
                                    'exp_provoking_prompt',  e.exp_provoking_prompt,
                                    'exp_crated_at', e.exp_created_at,
                                    'exp_status', e.exp_status,
                                    'exp_name',e.exp_name,
                                    'exp_num_participants', e.exp_num_participants,
                                    'exp_messages_col_id', e.exp_messages_col_id,
                                    'study_id', s.study_id,
                                    'study_name', s.study_name
                                ),
                                'agents', '[]'::jsonb
                            ) AS exp_agents
                            FROM experiments e
                            INNER JOIN study_experiment se ON se.exp_id = e.exp_id
                            INNER JOIN studies s ON s.study_id = se.study_id
                            WHERE e.exp_id = $1)
                            END AS exp_agents )`,
        [exp_id]
    )
    const {exp_agents} = rows[0]
    return exp_agents;
}

module.exports = {
    createAgent,
    jointAgentToExperiment,
    getAgentById,
    getExperimentWithAgentsAsJson
}
