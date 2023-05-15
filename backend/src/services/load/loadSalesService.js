const importSales = require('../../utils/loader')
const partnerSales = require('../../models/partnerSales')
const powernetSales = require('../../models/powernetSales')
const moment = require('moment');

class Load{
    async byApi(id=''){
        let [sales, partner] = await importSales(id)
        sales = JSON.parse(sales)
        
        if (id != 'powernet'){
            sales.forEach((sale)=>{
                const vendDate = new Date(sale[partner['VendDate']])
                vendDate.setHours(0, 0, 0, 0)
                console.log(sale)
                partnerSales.insert({
                    "partnerId": partner['Partner_ID'] === null ? partner['Partner_Name'] : sale[partner['Partner_ID']], 
                    "token": partner['Token'] === null ? null : sale[partner['Token']], 
                    "amount": partner['Amount'] === null ? null : sale[partner['Amount']], 
                    "kwh": (partner['KWH'] === null || sale[partner['KWH']] === '') ? null : (sale[partner['KWH']].slice(-3).toLocaleLowerCase() === 'kwh') ? sale[partner['KWH']].slice(0, -3): sale[partner['KWH']], 
                    "vendDate": partner['VendDate'] === null ? null : vendDate.toISOString().slice(0, 19).replace('T', ' '), 
                    "transactionId": partner['Transaction_ID'] === null ? null : sale[partner['Transaction_ID']], 
                    "fees": partner['Fees'] === null ? null : sale[partner['Fees']], 
                    "meterNumber": partner['Meter_Number'] === null ? null : sale[partner['Meter_Number']], 
                    "eneoAccount": partner['Eneo_Account'] === null ? null : sale[partner['Eneo_Account']]
                }) 
            })
        }
        else{
            sales.forEach((sale)=>{
                const vendDate = new Date(sale["VENING_TIME"])
                vendDate.setHours(0, 0, 0, 0)
                console.log(sale)
                powernetSales.insert({
                    "partner": sale["POS"], 
                    "token": sale["TOKEN"], 
                    "amount": sale["PAID"], 
                    "kwh": null, 
                    "vendDate": vendDate.toISOString().slice(0, 19).replace('T', ' '), 
                    "transactionId": sale["ORDER_ID"], 
                    "fees": null, 
                    "meterNumber": sale["METER_NO"], 
                    "msgId": sale["MSGID"]
                }) 
            })
        }
    }
    async byUpload(){
        
    }
}
const load = new Load()
module.exports = load