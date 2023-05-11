const pool = require('../../utils/pool')

class Reconsciliation{
    async byToken(source){
        const connection = await pool.getConnection()
        const query = ``
        try {
            const results = await pool.query(query, source);
            console.log('Query executed successfully');
            console.log(results[0]);
          } catch (error) {
            console.error('Error executing query:', error);
        }
    }
    async byAlt(source){
        const connection = await pool.getConnection()
        const query = ``
        try {
            const results = await pool.query(query, source);
            console.log('Query executed successfully');
            console.log(results[0]);
          } catch (error) {
            console.error('Error executing query:', error);
        }
    }
    async byMessageId(source){
        const connection = await pool.getConnection()
        const query = ``
        try {
            const results = await pool.query(query, source);
            console.log('Query executed successfully');
            console.log(results[0]);
          } catch (error) {
            console.error('Error executing query:', error);
        }
    }
}

const reconcile = new Reconsciliation
module.exports = reconcile