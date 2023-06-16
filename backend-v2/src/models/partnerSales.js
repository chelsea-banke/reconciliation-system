const pool = require('../utils/pool')

class PartnerSales{ 
    async insert(sale){
        const connection = await pool.getConnection()
        try{
            const query = `INSERT INTO PartnerPPSales (Partner_ID, Token, Amount, KWH, VendDate, Transaction_ID, Fees, Meter_Number, Eneo_Account, Message_ID)
            SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
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
                sale.messageId,
            ]
            return(await connection.query(query, values))[0]
        }
        catch(error){
            console.log("error")
        }
        finally{
            connection.release()
        }
    }
}
const partnerSales = new PartnerSales
module.exports = partnerSales