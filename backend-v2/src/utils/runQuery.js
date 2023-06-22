const pool = require("./pool")

const runQuery = async (query, values) => {
    while (true) {
        const connection = await pool.getConnection()
        try {
            const result = await connection.query(query, values)
            console.log(result[0]);
            break; // Query succeeded, exit the loop
        } 
        catch (error) {
                console.log("Error:", error)
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