const db = require("../DB");
const createStudy = async (name, subject, prompt, description) => {
    const {rows} = await db.query(
        "INSERT INTO studies (study_name, study_subject, study_prompt, study_description) VALUES ($1, $2, $3, $4) RETURNING *",
        [name, subject, prompt, description]
    );
    return rows[0];
}


const getAllStudies = async () => {
    const {rows} = await db.query('SELECT * FROM studies');
    return rows;
}

const getExperimentsByStudyId = async (id) => {
    const {rows} = await db.query(
        `SELECT    e.exp_id,
                        exp_subject,
                        exp_provoking_prompt,
                        exp_created_at,
                        exp_status,
                        exp_name,
                        exp_messages_col_id
                        FROM study_experiment se 
                        INNER JOIN experiments e ON se.exp_id = e.exp_id
                        GROUP BY se.study_id, se.exp_id, e.exp_id
                        HAVING study_id = $1;`, [id]);
    return rows;

}

const getStudyById = async (id) => {
    const {rows} = await db.query('SELECT * FROM studies WHERE study_id = $1', [id]);
    return rows[0];
}


const updateStudy = async (id, name, subject, prompt, description) => {
    const {rows} = await db.query(
        "UPDATE studies SET study_name = $1, study_subject = $2, study_prompt= $3, study_description = $4 " +
        "WHERE study_id = $5 RETURNING *",
        [name, subject, prompt, description, id]
    );
    return rows;
}


const deleteStudy = async (id) => {
    await db.query('DELETE FROM studies WHERE study_id = $1', [id]);
}

const addExperimentsToStudy = async (studyId, expId) => {
    const {rows} = await db.query(
        "INSERT INTO study_experiment (study_id, exp_id) VALUES ($1, $2) RETURNING *",
        [studyId, expId]
    );
    return rows[0];
}
module.exports = {
    createStudy,
    getAllStudies,
    getExperimentsByStudyId,
    getStudyById,
    updateStudy,
    deleteStudy,
    addExperimentsToStudy
}
