const moment = require("moment")
const pool = require('../utils/pool')
const reconStatus = require("../models/reconStatus")
const exceptions = require("../models/exceptions")

const generateExceptions = async (partner, reconDate)=>{
    const connection = pool.getConnection()
    const vendDate = moment(reconDate, "D/M/YYYY").subtract(1, "days").format("D/M/YYYY")
    try{
        const powernetSales = (await pool.query(`SELECT * FROM PowerNetPPSales WHERE VendDate = ?`, [vendDate]))[0]
        if (powernetSales.length != 0){
            console.log(await exceptions.generatePowernetExceptions(partner, reconDate, vendDate))
            console.log(await exceptions.generatePartnerExceptions(partner, reconDate, vendDate))
    
            const reconId = `${partner}-${reconDate}`
            const salesCount = (await pool.query(`SELECT * FROM PartnerPPSales WHERE Recon_ID = ?`, [reconId]))[0].length
            const exceptionSales = (await pool.query(`SELECT * FROM Exceptions WHERE Recon_ID = ?`, [reconId]))[0]
            const exceptionsCount = exceptionSales.length
            const matchCount = salesCount - exceptionsCount
    
            const reconStatusData = {
                "reconId": reconId,
                "reconDate": reconDate,
                "partner": partner,
                "salesCount": salesCount,
                "matchCount": matchCount,
                "exceptionsCount": exceptionsCount
            }
            reconStatus.insert(reconStatusData)
    
            return({
                "reconStats": reconStatusData,
                "exceptionSales": exceptionSales
            })
        }
        else {
            return `it seems powernetSales for vendate ${vendDate} have not been uploaded`
        }
    } catch(error){
        console.log("error generating exceptions due to: ", error)
    }
    finally{
        (await connection).release()
    }
}

module.exports = generateExceptions