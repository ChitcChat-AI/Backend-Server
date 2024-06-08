const {Pool} = require('pg');
require('dotenv').config()

const pool = new Pool({
           host: process.env.RDS_HOSTNAME,
           user: process.env.RDS_USERNAME,
           password: process.env.RDS_PASSWORD,
           port: process.env.RDS_PORT,
           database: process.env.RDS_DB_NAME
       })

pool.on('connect', (client) => {});
pool.on('error', (err, client) => {
    throw(err);

})
module.exports = {
    query: (text, params) => pool.query(text, params),
};


