const db = require("../DB");
module.exports = {
    creatResearcher: async (id, name, email, photoURL) => {
        const {rows} = await db.query(
            `INSERT INTO researchers (researcher_id, researcher_name, researcher_photo_url, researcher_email)
                VALUES ($1,$2,$3,$4)
                RETURNING *`,
            [id, name, photoURL, email]);
        return rows[0];

    },
    updateResearcher: async (id, newColsArray) => {
        const newData = [id];
        const {rows} = await db.query(`
    UPDATE researchers
    SET ` +
            newColsArray.reduce((acc, [k, v], idx) => {
                newData.push(v);
                return '' + k + ' = $' + (idx + 2) + ', '
            }, '').slice(0, -2) +
            ` WHERE researcher_id = $1 RETURNING *`
            , newData);
        return rows;
    },


    deleteResearcher: async (id) => {
        await db.query('DELETE FROM researchers WHERE researcher_id = $1', [id]);

    },

    getResearcherById: async (id) => {
        const {rows} =  await db.query('SELECT * FROM researchers WHERE researcher_id= $1', [id])
        return rows[0];
    }

}