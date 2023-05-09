const importSales = require('../../utils/importer')
const Filepaths = require('../../utils/paths.json')
const partnerSales = require('../../models/partnerSales')

class Load{
    async byApi(id=''){
        let paths = Filepaths
        if (!id==''){paths={id: Filepaths[id]}}
        
        for (let source in paths){
            const sales = JSON.parse(await importSales(paths[source], id))
            // console.log(JSON.parse(sales))
            if (id == 'mtn'){
                sales.forEach((sale)=>{
                    partnerSales.insert({
                        "partnerId": sale.PARTNER, 
                        "token": null, 
                        "amount": sale.AMOUNT, 
                        "kwh": null, 
                        "vendDate": sale.TXDATE, 
                        "transactionId": sale.TXID, 
                        "fees": null, 
                        "meterNumber": sale.METER_NUMBER, 
                        "eneoAccount": null
                    }) 
                })    
            }
            else if (id == 'orange'){
                sales.forEach((sale)=>{
                    partnerSales.insert({
                        "partnerId": null, 
                        "token": sale.Token, 
                        "amount": sale.Montantdelatransaction, 
                        "kwh": sale.KWH, 
                        "vendDate": sale.Datedetransaction, 
                        "transactionId": null, 
                        "fees": null, 
                        "meterNumber": sale.Numérodetéléphoneduclient, 
                        "eneoAccount": null
                    }) 
                })    
            }
            else if (id == 'expressExchange'){
                sales.forEach((sale)=>{
                    partnerSales.insert({
                        "partnerId": null, 
                        "token": sale.Token, 
                        "amount": sale.Montant, 
                        "kwh": sale.Kwh, 
                        "vendDate": sale.Datedemiseajour, 
                        "transactionId": null, 
                        "fees": null, 
                        "meterNumber": null, 
                        "eneoAccount": null
                    }) 
                })    
            }
            else if (id == 'legacy'){
                sales.forEach((sale)=>{
                    partnerSales.insert({
                        "partner": sale.POS, 
                        "token": sale.TOKEN, 
                        "amount": sale.PAID, 
                        "kwh": null, 
                        "vendDate": sale.VENDING_TIME, 
                        "transactionId": null, 
                        "fees": null, 
                        "meterNumber": sale.METER_NO, 
                        "msgId": sale.MSGID
                    }) 
                })   
            }
            else if (id == 'ecobank'){
                console.log('ecobank')
                sales.forEach((sale)=>{
                    partnerSales.insert({
                        "partnerId": sale["Patner ID"], 
                        "token": sale['Token'], 
                        "amount": sale['Montant'], 
                        "kwh": sale['KWH'].slice(0,-3), 
                        "vendDate": sale['Date'], 
                        "transactionId": sale['External Transaction Id'], 
                        "fees": null, 
                        "meterNumber": sale['Meter Number'], 
                        "msgId": null
                    }) 
                })
            }
            else if (id == 'afrikpay'){
                sales.forEach((sale)=>{
                    partnerSales.insert({
                        "partnerId": sale['Patner ID'], 
                        "token": sale['Token'], 
                        "amount": sale['Montant'], 
                        "kwh": sale['KWH'].slice(0,-3), 
                        "vendDate": null, 
                        "transactionId": sale['External Transaction id'], 
                        "fees": null, 
                        "meterNumber": sale['Meter Number'], 
                        "msgId": null
                    }) 
                })   
            }
        }
    }
    async byUpload(){
        
    }
}
const load = new Load()
module.exports = load