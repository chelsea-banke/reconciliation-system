const pool = require('../utils/pool')

const generateExceptions = async (partner, date)=>{
    const connection = await pool.getConnection()
    const query =(`
        INSERT INTO Exceptions (Type, Reference, Status, Partner_ID, Amount, Transaction_ID, Meter_Number, Token, VendDate, Recon_ID, Message_ID)
        SELECT 'Powernet', t1.ID, 'Unresolved', t1.Partner_ID, t1.Amount, t1.Transaction_id, t1.Meter_Number, t1.Token, t1.VendDate, t1.Recon_ID, t2.Message_ID
        FROM PowerNetPPSales t2
        LEFT JOIN PartnerPPSales t1 ON t1.Message_ID = t2.Message_ID
        WHERE t2.VendDate = ?
            AND t2.Partner IS NOT NULL
            AND t1.Partner_ID = ?;      
    `)

    try {
        console.log(".....................................................................................................")
        return((await pool.query(query, [date, partner]))[0])
    } 
    catch (error) {
        console.error('Error executing query:', error)
    }
    finally{
        connection.release()
    }
}

module.exports = generateExceptions