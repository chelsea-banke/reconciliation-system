const pool = require('../utils/pool')

class PowerNetSales{
    async insert(sale){
        const connection = await pool.getConnection()
        try{
            const query = 'INSERT INTO PowerNetPPSales (Partner, Token, Amount, KWH, VendDate, Transaction_ID, Fees, Meter_Number, MSGID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
            const values = [
                sale.partner, 
                sale.token, 
                sale.amount, 
                sale.kwh, 
                sale.vendDate, 
                sale.transactionId, 
                sale.fees, 
                sale.meterNumber, 
                sale.msgId
            ]
            const dt = (await connection.query(query, values))[0]
            return dt
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