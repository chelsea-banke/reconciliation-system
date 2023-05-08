const csvtojson = require('convert-csv-to-json')

const importSales = async (path, source)=>{
    if (source=='legacy'){
        return (JSON.stringify(csvtojson.fieldDelimiter('#').getJsonFromCsv(path), null, 2)) 
    }
    if (source=='mtn' || source=='expressExchange'){
        return (JSON.stringify(csvtojson.fieldDelimiter(',').getJsonFromCsv(path), null, 2))
    }
    if (source=='orange'){
        return (JSON.stringify(csvtojson.fieldDelimiter(';').getJsonFromCsv(path), null, 2))
    }
    if (source=='ecobank'){
        return (JSON.stringify(csvtojson.fieldDelimiter(';').getJsonFromCsv(path), null, 2))
    }
    // else { return (JSON.stringify(csvtojson.getJsonFromCsv(path), null, 2)) }
}

module.exports = importSales
