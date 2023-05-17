const pool = require('./pool')

const systemQuery = async (query, values=[])=>{
    const connection = await pool.getConnection()
    try {
        const results = await pool.query(query, values)
        console.log('Query executed successfully')
        return results
    } 
    catch (error) {
        console.error('Error executing query:', error)
    }
    finally{
        connection.release()
    }
}

module.exports = systemQuery