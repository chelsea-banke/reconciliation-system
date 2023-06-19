const fieldCheck = require("../utils/fieldCheckUtils")
const partnerSales = require("../models/partnerSales")
const brokenSales = require("../models/brokensales")
const preRocon = require("../models/preReconStatus")

const loader = async ( partnerId, sales)=>{
    const currentDate = new Date().toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    const reconId = `${partnerId}-${currentDate}`
    let faultySales = []

    sales.forEach(async sale => {
        const status = fieldCheck(sale)
        if (status["valid"] == false){
            faultySales.push({
                "faultySale": sale,
                "faultyFields": status["fields"]
            })
            status["fields"].forEach(feild=>{
                sale[feild] = null
            })
            brokenSales.insert(sale, JSON.stringify(status["fields"]))
        }
        else{
            await partnerSales.insert(sale, reconId)
        }
    })

    const preReconStatus = {
        "reconDate": currentDate,
        "partnerId": partnerId,
        "reconId": reconId,
        "salesCount": sales.length,
        "brokenSalesCount": faultySales.length
    }
    console.log(preReconStatus)
    await preRocon.insert(preReconStatus)
    return({
        "status": preReconStatus,
        "brokenSales": faultySales
    })
}

module.exports = loader