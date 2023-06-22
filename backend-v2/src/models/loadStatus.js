const runQuery = require('../utils/runQuery')

class LoadStatus{ 
    async insert(status){
        const query = `INSERT INTO LoadStatus (Recon_Date, Partner_ID, Recon_ID, Sales_Count, Broken_Sales_Count)
        SELECT ?, ?, ?, ?, ?
        FROM dual
        WHERE NOT EXISTS (
          SELECT 1 FROM LoadStatus WHERE Recon_ID = ?
        )`
        const values = [
            status["reconDate"],
            status["partnerId"],
            status["reconId"],
            status["salesCount"],
            status["brokenSalesCount"],
            status["reconId"],
        ]
        
        await runQuery(query, values)
    
    }
}
const loadStatus = new LoadStatus
module.exports = loadStatus