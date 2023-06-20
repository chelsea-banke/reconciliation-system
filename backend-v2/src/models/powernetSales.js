const pool = require('../utils/pool')

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
        
        try{
            console.log((await connection.query(query, values))[0])
        }
        catch(error){
            console.log("error", error)
        }
        finally{
            connection.release()
        }
    };
}
const powerNetSales = new PowerNetSales
module.exports = powerNetSales