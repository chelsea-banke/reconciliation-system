const csvtojson = require('convert-csv-to-json')
const excel = require('node-xlsx');
const pool = require('./pool')
// require('')

const loadSales = async (id)=>{
    let partner
    if (id == 'powernet'){
        partner = {
            "File_Type": "csv",
            "Delimeter": "#",
            "Source": "/media/chelsea/New Volume/projects/repositories/reconciliation-system/backend/resources/powernet.csv"
        }
    }
    else {
        const connection = await pool.getConnection();
        partner = ((await connection.query('SELECT * FROM Partners'))[0].filter(obj=>{
            return obj['Partner_Name']==id
        }))[0]
    }
    if (partner['File_Type'] == 'csv'){
        console.log(id)
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

module.exports = loadSales