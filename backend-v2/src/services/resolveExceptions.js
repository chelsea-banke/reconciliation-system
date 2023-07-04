const runQuery = require("../utils/runQuery")

const resolveExceptions = async()=>{
    const exceptionSales = (await runQuery(`SELECT * FROM Exceptions WHERE Status = 'Unresolved' AND Type = 'Partner'`))[0]
    let resolvedExceptionsCount = 0
    exceptionSales.forEach(async sale=>{
        const results = (await runQuery(`SELECT * FROM PowerNetPPSales WHERE Message_ID = ?`, [sale["Message_ID"]]))[0]
        if (results.length != 0){
            await runQuery(`UPDATE Exceptions SET Status = ?, matchReference = ? WHERE ID = ?;`, ["Resolved", results["ID"], sale["ID"]])
            resolvedExceptionsCount+=1
        }
    })
    const exceptionSalesCount = exceptionSales.length
    console.log({
        "exceptionSalesCount": exceptionSalesCount,
        "resolvedExceptionsCount": resolvedExceptionsCount
    })
    return({
        "exceptionSalesCount": exceptionSalesCount,
        "resolvedExceptionsCount": resolvedExceptionsCount
    })
}

module.exports = resolveExceptions


// const resolvePartnerExceptions = async(sales)=>{
//     let resolvedSales = []
//     sales.forEach(async sale=>{
//         const results = (await runQuery(`SELECT * FROM Exceptions WHERE Message_ID = ?`, [sale["messageId"]]))[0]
//         if(results.length != 0){
            
//         }
//     })
// }