const pool = require('../utils/pool')

class PowerNetSales{
    async insert(sale){
        try {
            const connection = await pool.getConnection();
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
            ];
            await connection.query(query, values);
            connection.release();
            console.log('sale inserted into PowerNetPPSales table.');
        } catch (error) {
            console.error('Error inserting sale into PowerNetPPSales table:', error);
        }
    };
}
const powerNetSales = new PowerNetSales
module.exports = powerNetSales