const csvtojson = require('convert-csv-to-json')
const powernetSales = require("../models/powernetSales")

const loadPowernet = async (url)=>{
    const sales = (await csvtojson.fieldDelimiter('#').getJsonFromCsv(url))
    
    let count = 0
    await sales.forEach(async (sale)=>{
        let vendDate = new Date(sale["VENING_TIME"])
        vendDate = `${vendDate.getDate()}/${vendDate.getMonth() + 1}/${vendDate.getFullYear()}`
        
        if (sale['ORDERS_ID'] != null){
            (await powernetSales.insert({
                "partner": sale["POS"], 
                "token": sale["TOKEN"], 
                "amount": sale["PAID"], 
                "kwh": null, 
                "vendDate": vendDate, 
                "transactionId": sale["ORDER_ID"], 
                "fees": null, 
                "meterNumber": sale["METER_NO"], 
                "messageId": sale["MSGID"]
            }))
        }
        count+=1
        console.log(count)
    })
    return(sales.length)
}

module.exports = loadPowernet