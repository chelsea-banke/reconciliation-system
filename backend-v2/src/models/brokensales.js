const runQuery = require('../utils/runQuery')

class BrokenSales{ 
    async insert(sale, brokenFields){
        const connection = await pool.getConnection()
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

        await runQuery(query, values)
        
    }
}
const brokenSales = new BrokenSales
module.exports = brokenSales