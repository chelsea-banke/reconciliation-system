const runQuery = require('../utils/runQuery')

class PowerNetSales{
    async insert(sale){
        const connection = await pool.getConnection()
        const query = `INSERT INTO PowerNetPPSales (Partner, Token, Amount, KWH, VendDate, Transaction_ID, Fees, Meter_Number, Message_ID)
        SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?
        FROM dual
        WHERE NOT EXISTS (
          SELECT 1 FROM PowerNetPPSales WHERE Message_ID = ?
        )`;
        const values = [
            sale.partner, 
            sale.token, 
            sale.amount, 
            sale.kwh, 
            sale.vendDate, 
            sale.transactionId, 
            sale.fees, 
            sale.meterNumber, 
            sale.messageId,
            sale.messageId,
        ]
            
        console.log( await runQuery(query, values))
    
    };
}
const powerNetSales = new PowerNetSales
module.exports = powerNetSales