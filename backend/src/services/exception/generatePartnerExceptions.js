const pool = require('../../utils/pool')
const systemQuery = require('../../utils/query')

class PartnerExceptionGenerator{
    async byToken(){
        const query =(`
            INSERT INTO Exceptions 
            SELECT 'Partner', t2.ID, 'Unresolved', t1.Partner_ID, 3, t1.Amount, t1.transaction_id, t1.Meter_Number, t1.token, t1.VendDate, t2.msgid
            FROM PowerNetPPSales t2
            LEFT JOIN PartnerPPSales t1 ON t1.token = t2.token
            WHERE t1.token IS NULL
              AND DATE(t2.VendDate) = DATE(DATE_SUB(CURDATE(), INTERVAL 1 DAY))
              AND t2.Partner IS NOT NULL;     
        `)
        return (systemQuery
        (query))
    }

    async byMessageId(source){
        const query =(`
            INSERT INTO Exceptions 
            SELECT 'Powernet', t1.ID, 'Unresolved', t1.Partner_ID, 3, t1.Amount, t1.transaction_id, t1.Meter_Number, t1.token, t1.VendDate, t2.msgid
            FROM PowerNetPPSales t2
            LEFT JOIN PartnerPPSales t1 ON t1.token = t2.token
            WHERE t1.token IS NULL
              AND DATE(t2.VendDate) = DATE(DATE_SUB(CURDATE(), INTERVAL 1 DAY))
              AND t2.Partner IS NOT NULL;     
        `)
        return(systemQuery
        (query))
    }
}

const partnerExceptionGenerator = new PartnerExceptionGenerator
module.exports = partnerExceptionGenerator