const pool = require('../utils/pool')

class PartnerSales{ 
    async insert(sale, reconId){
        const connection = await pool.getConnection()
        const query = `INSERT INTO PartnerPPSales (Partner_ID, Token, Amount, KWH, VendDate, Transaction_ID, Fees, Meter_Number, Eneo_Account, Message_ID, Recon_ID)
        SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
        FROM dual
        WHERE NOT EXISTS (
          SELECT 1 FROM PartnerPPSales WHERE Message_ID = ?
        )`
        const values = [
            sale.partnerId, 
            sale.token, 
            sale.amount, 
            sale.kwh, 
            sale.vendDate, 
            sale.transactionId, 
            sale.fees, 
            sale.meterNumber, 
            sale.eneoAccount,
            sale.messageId,
            reconId,
            sale.messageId,
        ]
        
        try{
            console.log((await connection.query(query, values))[0])
        }
        catch(error){
            console.log("error", error)
        }
        finally{
            connection.release()
        }
    }
}
const partnerSales = new PartnerSales
module.exports = partnerSales