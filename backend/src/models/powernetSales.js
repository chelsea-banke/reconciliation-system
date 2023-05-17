const systemQuery = require('../utils/query')

class PowerNetSales{
    async insert(sale){
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
        console.log(await systemQuery(query, values))
    };
}
const powerNetSales = new PowerNetSales
module.exports = powerNetSales