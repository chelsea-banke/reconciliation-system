const partners = require('../../models/partners')

const addNewPartner = async (properties)=>{
    // console.log(properties)
    partners.insert({
        "partnerName": properties['partnerName'] == "" ? null : properties['partnerName'],
        "source": properties['source'] == "" ? null : properties['source'],
        "fileType": properties['fileType'] == "" ? null : properties['fileType'],
        "deleimeter": properties['deleimeter'] == "" ? null : properties['delimeter'],
        "partnerId": properties['partnerId'] == "" ? null : properties['partnerId'], 
        "token": properties['token'] == "" ? null : properties['token'], 
        "amount": properties['amount'] == "" ? null : properties['amount'], 
        "kwh": properties['kwh'] == "" ? null : properties['kwh'], 
        "vendDate": properties['vendDate'] == "" ? null : properties['vendDate'], 
        "transactionId": properties['transactionId'] == "" ? null : properties['transactionId'], 
        "fees": properties['fees'] == "" ? null : properties['fees'], 
        "meterNumber": properties['meterNumber'] == "" ? null : properties['meterNumber'], 
        "eneoAccount": properties['eneoAccount'] == "" ? null : properties['eneoAccount']
    })
}

module.exports = addNewPartner