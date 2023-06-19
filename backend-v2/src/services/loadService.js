const fieldCheck = require("../utils/fieldCheckUtils")
const partnerSales = require("../models/partnerSales")
const brokenSales = require("../models/brokensales")

const loader = async (sales)=>{
    let faultySales = []
    sales.forEach(sale => {
        const status = fieldCheck(sale)
        console.log(status)
        if (status["valid"] == false){
            faultySales.push({
                "faultySale": sale,
                "faultyFields": status["fields"]
            })
            brokenSales.insert(sale, JSON.stringify(status["fields"]))
        }
        else{
            partnerSales.insert(sale)
        }
    })
    return faultySales
}

module.exports = loader