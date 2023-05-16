const pool = require('./pool')

const reconcile = async (query)=>{
    const connection = await pool.getConnection()
    try {
        const results = await pool.query(query)
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

module.exports = reconcile