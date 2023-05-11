const pool = require('../utils/pool')

class Partners{ 
    async insert(partner){
        try {
            const connection = await pool.getConnection();
            const query = `INSERT INTO Partners (Partner_Name, Source, File_Type, Delimeter, Partner_ID, Token, Amount, KWH, VendDate, Transaction_ID, Fees, Meter_Number, Eneo_Account)
            SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
            WHERE NOT EXISTS (
              SELECT 1 FROM Partners WHERE Partner_Name = ?
            )`
            const values = [
                partner.partnerName,
                partner.source,
                partner.fileType,
                partner.deleimeter,
                partner.partnerId, 
                partner.token, 
                partner.amount, 
                partner.kwh, 
                partner.vendDate, 
                partner.transactionId, 
                partner.fees, 
                partner.meterNumber, 
                partner.eneoAccount,
                partner.partnerName
            ]
            await connection.query(query, values)
            connection.release();
            console.log('Data inserted into Partners table.')
        } catch (error) {
            console.error('Error inserting data into Partners table:', error)
        }
    }
}
const partners = new Partners
module.exports = partners