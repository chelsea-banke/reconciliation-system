const pool = require('../utils/pool')

class PartnerSales{ 
    async insert(sale){
        const connection = await pool.getConnection()

        const query = 'INSERT INTO PartnerPPSales (Partner_ID, Token, Amount, KWH, VendDate, Transaction_ID, Fees, Meter_Number, Eneo_Account) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
        const values = [
            sale.partnerId, 
            sale.token, 
            sale.amount, 
            sale.kwh, 
            sale.vendDate, 
            sale.transactionId, 
            sale.fees, 
            sale.meterNumber, 
            sale.eneoAccount
        ]
        return(await connection.query(query, values))[0]
    }
}
const partnerSales = new PartnerSales
module.exports = partnerSales