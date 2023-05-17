const systemQuery = require('../utils/query')

class Partners{ 
    async insert(partner){
        const query = `INSERT INTO Partners (Partner_Name, Source, File_Type, Delimeter, Partner_ID, Token, Amount, KWH, VendDate, Transaction_ID, Fees, Meter_Number, Eneo_Account)
        SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
        WHERE NOT EXISTS (
          SELECT 1 FROM Partners WHERE Partner_Name = ?
        )`
        const values = [
            partner.partnerName,
            partner.source,
            partner.fileType,
            partner.deleimeter,
            partner.partnerId, 
            partner.token, 
            partner.amount, 
            partner.kwh, 
            partner.vendDate, 
            partner.transactionId, 
            partner.fees, 
            partner.meterNumber, 
            partner.eneoAccount,
            partner.partnerName
        ]
        console.log(systemQuery(query, values))
    }
}
const partners = new Partners
module.exports = partners