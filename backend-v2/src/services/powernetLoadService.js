const csvtojson = require('convert-csv-to-json')

const loadPowernet = async (path="")=>{
    const sales = (await csvtojson.fieldDelimiter(',').getJsonFromCsv(path), null, 2)

    sales.forEach(async (sale)=>{
        const vendDate = new Date(sale["VENING_TIME"])
        vendDate.setHours(0, 0, 0, 0)
        const currentDate = new Date().toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
        if (sale['ORDER_ID'] != null){
            console.log(await powernetSales.insert({
                "partner": sale["POS"], 
                "token": sale["TOKEN"], 
                "amount": sale["PAID"], 
                "kwh": null, 
                "vendDate": vendDate.toISOString().slice(0, 19).replace('T', ' '), 
                "transactionId": sale["ORDER_ID"], 
                "fees": null, 
                "meterNumber": sale["METER_NO"], 
                "messageId": sale["MSGID"],
                "reconDate": currentDate
            }))
        }
    })
}

module.exports = loadPowernet