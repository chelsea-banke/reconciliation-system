const importSales = require('../../utils/importer')
const Filepaths = require('../../utils/paths.json')
const partnerSales = require('../../models/partnerSales')
const powernetSales = require('../../models/powernetSales')

class Load{
    async byApi(id=''){
        let [sales, partner] = await importSales(id)
        sales = JSON.parse(sales)
        // console.log(sales)
        
        if (id != 'legacy'){
            sales.forEach((sale)=>{
                partnerSales.insert({
                    "partnerId": partner['Partner_ID'] === null ? null : sale[partner['Partner_ID']], 
                    "token": partner['Token'] === null ? null : sale[partner['Token']], 
                    "amount": partner['Amount'] === null ? null : sale[partner['Amount']], 
                    "kwh": partner['KWH'] === null ? null : (sale[partner['KWH']].slice(-3) === 'kwh') ? sale[partner['KWH']].slice(0, -3): sale[partner['KWH']], 
                    "vendDate": partner['VendDate'] === null ? null : sale[partner['VendDate']], 
                    "transactionId": partner['Transaction_ID'] === null ? null : sale[partner['Transaction_ID']], 
                    "fees": partner['Fees'] === null ? null : sale[partner['Fees']], 
                    "meterNumber": partner['Meter_Number'] === null ? null : sale[partner['Meter_Number']], 
                    "eneoAccount": partner['Eneo_Account'] === null ? null : sale[partner['Eneo_Account']]
                }) 
            })
        }
    }
    async byUpload(){
        
    }
}
const load = new Load()
module.exports = load