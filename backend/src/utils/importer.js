const csvtojson = require('convert-csv-to-json')
const excel = require('node-xlsx');
// require('')

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
    if (source=='ecobank' || source=='afrikpay'){
        let out = []
        const sales = (excel.parse(path))[0].data
        const keys = sales[0]
        
        sales.slice(1, -1).forEach(values => {
            out.push(keys.reduce((obj, key, index) => {
                obj[key] = values[index];
                return obj;
            }, {}))
        })
        return(JSON.stringify(out))
    }
}

module.exports = importSales
