const csvtojson = require('convert-csv-to-json')
const powernetSales = require("../models/powernetSales")

const loadPowernet = async ()=>{
    const sales = (await csvtojson.fieldDelimiter('#').getJsonFromCsv("/home/chelsea/Downloads/powernet.csv"))

    sales.forEach(async (sale)=>{
        console.log(sale)
        const vendDate = new Date(sale["VENING_TIME"])
        vendDate.setHours(0, 0, 0, 0)

        if (sale['ORDERS_ID'] != null){
            console.log(await powernetSales.insert({
                "partner": sale["POS"], 
                "token": sale["TOKEN"], 
                "amount": sale["PAID"], 
                "kwh": null, 
                "vendDate": vendDate.toISOString().slice(0, 19).replace('T', ' '), 
                "transactionId": sale["ORDER_ID"], 
                "fees": null, 
                "meterNumber": sale["METER_NO"], 
                "messageId": sale["MSGID"]
            }))
        }
    })
}

module.exports = loadPowernet