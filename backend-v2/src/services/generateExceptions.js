const pool = require('../utils/pool')
const reconStatus = require("../models/reconStatus")
const exceptions = require("../models/exceptions")

const generateExceptions = async (partner, date)=>{
    const connection = pool.getConnection()
    try{
        console.log(await exceptions.generate(partner, date))

        const reconId = `${partner}-${date}`
        const salesCount = (await pool.query(`SELECT * FROM PartnerPPSales WHERE Recon_ID = ?`, [reconId]))[0].length
        const exceptionSales = (await pool.query(`SELECT * FROM Exceptions WHERE Recon_ID = ?`, [reconId]))[0]
        const exceptionsCount = exceptionSales.length
        const matchCount = salesCount - exceptionsCount

        const reconStatusData = {
            "reconId": reconId,
            "reconDate": date,
            "partner": partner,
            "salesCount": salesCount,
            "matchCount": matchCount,
            "exceptionsCount": exceptionsCount
        }
        reconStatus.insert(reconStatusData)

        return({
            "reconStats": reconStatusData,
            "excetionSales": exceptionSales
        })
    } catch(error){
        console.log("error generating exceptions due to: ", error)
    }
    finally{
        (await connection).release()
    }
}

module.exports = generateExceptions