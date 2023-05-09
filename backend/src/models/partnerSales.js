const pool = require('../utils/pool')

class PartnerSales{ 
    async insert(sale){
        try {
            const connection = await pool.getConnection();
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
            await connection.query(query, values)
            connection.release();
            console.log('Data inserted into PartnerPPSales table.')
        } catch (error) {
            console.error('Error inserting data into PartnerPPSales table:', error)
        }
    }
}
const partnerSales = new PartnerSales
module.exports = partnerSales