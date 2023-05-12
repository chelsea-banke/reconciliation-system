const csvtojson = require('convert-csv-to-json')
const excel = require('node-xlsx');
const pool = require('../utils/pool')
// require('')

const importSales = async (id)=>{
    const connection = await pool.getConnection();
    const partner = ((await connection.query('SELECT * FROM Partners'))[0].filter(obj=>{
        return obj['Partner_Name']==id
    }))[0]
    console.log(partner)
    let sales = []
    if (partner['File_Type'] == 'csv'){
        return [(JSON.stringify(
            csvtojson.fieldDelimiter(partner['Delimeter'])
            .getJsonFromCsv(partner['Source']), null, 2
        )), partner]
    }
    else if (partner['File_Type'] == 'xls'){
        let out = []
        const sales = (excel.parse(partner['Source']))[0].data
        const keys = sales[0]

        sales.slice(1, -1).forEach(values => {
            out.push(keys.reduce((obj, key, index) => {
                obj[key] = values[index];
                return obj;
            }, {}))
        })
        return([JSON.stringify(out), partner])
    }
}

module.exports = importSales