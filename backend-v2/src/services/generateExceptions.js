const pool = require('../utils/pool')

const generateExceptions = async (date, partner)=>{
    const connection = await pool.getConnection()
    const query =(`
        INSERT INTO Exceptions 
        SELECT 'Powernet', t1.ID, 'Unresolved', t1.Partner_ID, 3, t1.Amount, t1.transaction_id, t1.Meter_Number, t1.token, t1.VendDate, t2.msgid
        FROM PowerNetPPSales t2
        LEFT JOIN PartnerPPSales t1 ON t1.Message_ID = t2.Message_ID
        WHERE t1.token IS NULL
          AND DATE(t2.VendDate) = ?
          AND t2.Partner IS NOT NULL;     
    `)

    try {
        return (await pool.query(query, ))
    } 
    catch (error) {
        console.error('Error executing query:', error)
    }
    finally{
        connection.release()
    }
}

module.exports = generateExceptions