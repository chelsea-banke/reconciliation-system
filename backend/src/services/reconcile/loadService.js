const importSales = require('../../utils/importer')
const Filepaths = require('../../utils/paths.json')
const partnerSales = require('../../models/partnerSales')

class Load{
    async byApi(id=''){
        let paths = Filepaths
        if (!id==''){paths={id: Filepaths[id]}}
        
        for (let source in paths){
            let sales = await importSales(paths[source], id)
            console.log(JSON.parse(sales)[0])

            // if (source == 'mtn'){
            //     sales.forEach((sale)=>{
            //         partnerSales.insert({
            //             "partnerId": sale.PARTNER, 
            //             "token": null, 
            //             "amount": sale.AMOUNT, 
            //             "kwh": null, 
            //             "vendDate": sale.TXDATE, 
            //             "transactionId": sale.TXID, 
            //             "fees": null, 
            //             "meterNumber": sale.METER_NUMBER, 
            //             "eneoAccount": null
            //         }) 
            //     })    
            // }
            // else if (source == 'orange'){
            //     sales.forEach((sale)=>{
            //         partnerSales.insert({
            //             "partnerId": null, 
            //             "token": sale.Token, 
            //             "amount": sale.Montantdelatransaction, 
            //             "kwh": sale.KWH, 
            //             "vendDate": sale.Datedetransaction, 
            //             "transactionId": null, 
            //             "fees": null, 
            //             "meterNumber": sale.Numérodetéléphoneduclient, 
            //             "eneoAccount": null
            //         }) 
            //     })    
            // }
            // else if (source == 'expressExchange'){
            //     sales.forEach((sale)=>{
            //         partnerSales.insert({
            //             "partnerId": null, 
            //             "token": sale.Token, 
            //             "amount": sale.Montant, 
            //             "kwh": sale.Kwh, 
            //             "vendDate": sale.Datedemiseajour, 
            //             "transactionId": null, 
            //             "fees": null, 
            //             "meterNumber": null, 
            //             "eneoAccount": null
            //         }) 
            //     })    
            // }
            // else if (source == 'legacy'){
            //     sales.forEach((sale)=>{
            //         partnerSales.insert({
            //             "partner": sale.POS, 
            //             "token": sale.TOKEN, 
            //             "amount": sale.PAID, 
            //             "kwh": null, 
            //             "vendDate": sale.VENDING_TIME, 
            //             "transactionId": null, 
            //             "fees": null, 
            //             "meterNumber": sale.METER_NO, 
            //             "msgId": sale.MSGID
            //         }) 
            //     })   
            // }
            // else if (source == 'legacy'){
                
            // }    
        }
    }
    async byUpload(){
        
    }
}
const load = new Load()
module.exports = load