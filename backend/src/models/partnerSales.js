const systemQuery = require('../utils/query')

class PartnerSales{ 
    async insert(sale){
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
        consloe.log(await systemQuery(query, values))
    }
}
const partnerSales = new PartnerSales
module.exports = partnerSales