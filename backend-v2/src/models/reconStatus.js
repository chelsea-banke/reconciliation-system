const runQuery = require('../utils/runQuery')

class ReconStatus{ 
    async insert(status){
        const query = `INSERT INTO ReconStatus (Recon_Date, Partner_ID, Recon_ID, Partner_Exceptions_Count, Powernet_Exceptions_Count)
        SELECT ?, ?, ?, ?, ?
        FROM dual
        WHERE NOT EXISTS (
          SELECT 1 FROM ReconStatus WHERE Recon_ID = ?
        )`

        const values = [
            status["reconDate"],
            status["partner"],
            status["reconId"],
            status["partnerExceptionsCount"],
            status["powernetExceptionsCount"],
            status["reconId"]
        ]
        
        await runQuery(query, values)
    
    }
}
const reconStatus = new ReconStatus
module.exports = reconStatus