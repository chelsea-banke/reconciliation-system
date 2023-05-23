const pool = require('../../utils/pool')
const systemQuery = require('../../utils/query')

class PowernetExceptionGenerator{
    async byToken(date){
        const query =(`
            INSERT INTO Exceptions 
            SELECT 'Powernet', t1.ID, 'Unresolved', t1.Partner_ID, 3, t1.Amount, t1.transaction_id, t1.Meter_Number, t1.token, t1.VendDate, t2.msgid
            FROM PartnerPPSales t1
            LEFT JOIN PowerNetPPSales t2 ON t2.Token = t1.Token
            WHERE t2.token IS NULL
              AND DATE(t1.VendDate) = ?
              AND t1.Partner_ID IS NOT NULL
              AND t2.Token IS NOT NULL;     
        `)
        return systemQuery(query, [date])
    }
    async byAlt(date){
        const query = `
            INSERT INTO Exceptions
            SELECT 'Powernet', t1.ID, 'Unresolved', t1.Partner, 3, t1.Amount, t1.transaction_id, t1.Meter_Number, t1.token, t1.VendDate, t2.Message_ID
            FROM PowerNetPPSales t1
            LEFT JOIN PartnerPPSales t2 ON t2.Meter_Number = t1.Meter_Number
                AND DATE(t2.VendDate) = ? 
                AND t1.Amount = t2.Amount
            LEFT JOIN Partners p ON t1.Partner = p.Partner_Name
            WHERE t2.Amount IS NULL
                AND DATE(t1.VendDate) = ?
                AND t2.Token IS NOT NULL
            ORDER BY t1.VendDate DESC;
        `
        return systemQuery(query, [date, date])
    }
    async byMessageId(date){
        const query =(`
            INSERT INTO Exceptions 
            SELECT 'Powernet', t1.ID, 'Unresolved', t1.Partner_ID, 3, t1.Amount, t1.transaction_id, t1.Meter_Number, t1.MSGID, t1.MSGID, t2.msgid
            FROM PartnerPPSales t1
            LEFT JOIN PowerNetPPSales t2 ON t2.Token = t1.Token
            WHERE t2.token IS NULL
              AND DATE(t1.VendDate) = ?
              AND t1.Partner_ID IS NOT NULL;     
        `)
        return systemQuery(query, [date])
    }
}

const powernetExceptionGenerator = new PowernetExceptionGenerator
module.exports = powernetExceptionGenerator