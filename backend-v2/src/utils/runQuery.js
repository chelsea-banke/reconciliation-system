const pool = require("./pool")

const runQuery = async (query, values) => {
    while (true) {
        const connection = await pool.getConnection()
        try {
            const results = await connection.query(query, values) 
            return(results)
        } 
        catch (error) {
            if (error.code === 'ER_LOCK_DEADLOCK') {
                continue; // Retry the query
            } else {
                throw error; // Throw the error to stop retrying
            }
        } 
        finally {
            connection.release();
        }
    }
}

module.exports = runQuery