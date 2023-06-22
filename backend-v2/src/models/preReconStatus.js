const runQuery = require('../utils/runQuery')

class PostRocon{ 
    async insert(status){
        const connection = await pool.getConnection()
        const query = `INSERT INTO PreReconStatus (Recon_Date, Partner_ID, Recon_ID, Sales_Count, Broken_Sales_Count)
        SELECT ?, ?, ?, ?, ?
        FROM dual
        WHERE NOT EXISTS (
          SELECT 1 FROM PreReconStatus WHERE Recon_ID = ?
        )`
        const values = [
            status["reconDate"],
            status["partnerId"],
            status["reconId"],
            status["salesCount"],
            status["brokenSalesCount"],
            status["reconId"],
        ]
        
        console.log(await runQuery(query, values))
    
    }
}
const postRocon = new PostRocon
module.exports = postRocon