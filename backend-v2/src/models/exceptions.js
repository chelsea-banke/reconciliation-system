const runQuery = require('../utils/runQuery')

class Exceptions{ 
    async generatePowernetExceptions(partner, reconDate, vendDate){
        const query =(`
            INSERT INTO Exceptions (Type, Reference, Status, Partner_ID, Recon_ID, VendDate, Message_ID)
            SELECT 'Powernet', t1.ID, 'Unresolved', t1.Partner,  ?, t1.VendDate, t1.Message_ID
            FROM PowerNetPPSales t1
            WHERE t1.Partner = ?
                AND t1.VendDate = ?
                AND EXISTS (
                SELECT * FROM PartnerPPSales t2
                WHERE t2.Recon_ID = ?
                    AND NOT EXISTS (
                        SELECT 1 FROM PartnerPPSales t2
                        WHERE t1.Message_ID = t2.Message_ID
                    )
                );  
            `
        )
        const values = [`${partner}-${reconDate}`, partner, vendDate, `${partner}-${reconDate}`]
        console.log('generating Powernet exceptions...')
        return((await runQuery(query, values))[0])      
    }

    async generatePartnerExceptions(partner, reconDate, vendDate){
        const query =(`
            INSERT INTO Exceptions (Type, Reference, Status, Partner_ID, Recon_ID, VendDate, Message_ID)
            SELECT 'Partner', t1.ID, 'Unresolved', t1.Partner_ID,  ?, t1.VendDate, t1.Message_ID
            FROM PartnerPPSales t1
            WHERE t1.Recon_ID = ?
            AND EXISTS (
                SELECT * FROM PowerNetPPSales t2
                WHERE t2.VendDate = ?
                AND t2.Partner = ?
                AND NOT EXISTS (
                    SELECT 1 FROM PowerNetPPSales t2
                    WHERE t1.Message_ID = t2.Message_ID
                )
            );  
        `)
        const values = [`${partner}-${reconDate}`, `${partner}-${reconDate}`, vendDate, partner]
        console.log('generating Partner exceptions...')
        const results = (await runQuery(query, values))[0]
        return(results)  
    }
}
const exceptions = new Exceptions
module.exports = exceptions