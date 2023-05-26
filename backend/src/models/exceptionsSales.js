const pool = require('../utils/pool')

class ExceptionSales{ 
    async insert(sale){
        const connection = await pool.getConnection()
        try{
            const query = 'INSERT INTO LoadExceptionSales (Partner_ID, Token, Amount, KWH, VendDate, Transaction_ID, Fees, Meter_Number, Eneo_Account, Message_ID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
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
            ]
            return(await connection.query(query, values))[0]
        }
        catch(error){
            console.log("error", error)
        }
        finally{
            connection.release()
        }
    }
}
const exceptionSales = new ExceptionSales
module.exports = exceptionSales