const pool = require('../utils/pool')

class BrokenSales{ 
    async insert(sale, brokenFields){
        const connection = await pool.getConnection()
        try{
            const query = `INSERT INTO BrokenSales (Partner_ID, Token, Amount, KWH, VendDate, Transaction_ID, Fees, Meter_Number, Eneo_Account, Message_ID, Broken_Fields)
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
                brokenFields,
                sale.messageId,
            ]
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
const brokenSales = new BrokenSales
module.exports = brokenSales