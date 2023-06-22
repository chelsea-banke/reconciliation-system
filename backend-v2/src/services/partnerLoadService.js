const fieldCheck = require("../utils/fieldCheckUtils")
const partnerSales = require("../models/partnerSales")
const brokenSales = require("../models/brokensales")
const loadStatus = require("../models/loadStatus")
const formatDate = require("../utils/formatDate")

const loader = async ( partnerId, sales)=>{
    let currentDate = new Date();
    currentDate = formatDate(`${currentDate}`);
    
    const reconId = `${partnerId}-${currentDate}`
    let faultySales = []
    console.log(sales.length)
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
            sale["vendDate"] = formatDate(sale["vendDate"])
            await partnerSales.insert(sale, reconId)
        }
    })

    const loadStatusData = {
        "reconDate": currentDate,
        "partnerId": partnerId,
        "reconId": reconId,
        "salesCount": sales.length,
        "brokenSalesCount": faultySales.length
    }
    await loadStatus.insert(loadStatusData)
    return({
        "status": loadStatusData,
        "brokenSales": faultySales
    })
}

module.exports = loader