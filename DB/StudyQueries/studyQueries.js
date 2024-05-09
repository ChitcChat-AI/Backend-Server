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
       ` SELECT e.*, count(ea) as num_agents
                FROM experiments e
                INNER JOIN study_experiment se ON e.exp_id = se.exp_id
                LEFT JOIN experiment_agent ea on e.exp_id  = ea.exp_id
                GROUP BY e.exp_id, se.study_id HAVING se.study_id = $1`
        , [id]);
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

const updateStudyDynamically = async (newColsArray, studyId) => {
    const newData = [studyId];
    const {rows} = await db.query(`
    UPDATE studies
    SET ` +
        newColsArray.reduce((acc, [k, v], idx) => {
            newData.push(v);
            return '' + k + ' = $' + (idx + 2) + ', '
        }, '').slice(0, -2) +
        ` WHERE study_id = $1 RETURNING *`
        , newData);
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
    updateStudyDynamically,
    deleteStudy,
    addExperimentsToStudy
}
