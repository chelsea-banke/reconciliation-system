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
            // await exceptions.generatePowernetExceptions(partner, reconDate, vendDate)
            await exceptions.generatePartnerExceptions(partner, reconDate, vendDate)
            
            const reconId = `${partner}-${reconDate}`
            const partnerExceptionsCount = (await pool.query(`SELECT * FROM Exceptions WHERE Recon_ID = ? AND Type = 'Partner'`, [reconId]))[0].length
            const powernetExceptionsCount = (await pool.query(`SELECT * FROM Exceptions WHERE Recon_ID = ? AND Type = 'Powernet'`, [reconId]))[0].length
            const exceptionSales = (await pool.query(`SELECT * FROM Exceptions WHERE Recon_ID = ?`, [reconId]))[0]
    
            const reconStatusData = {
                "reconId": reconId,
                "reconDate": reconDate,
                "partner": partner,
                "partnerExceptionsCount": partnerExceptionsCount,
                "powernetExceptionsCount": powernetExceptionsCount
            }
            reconStatus.insert(reconStatusData)
            
            console.log({
                "reconStats": reconStatusData
            })

            return({
                "reconStats": reconStatusData,
                "exceptionSales": exceptionSales
            })
        }
        else {
            return({
                "vendDate": vendDate,
                "powernetSalesCount": powernetSales.length
            })
        }
    } catch(error){
        console.log("error generating exceptions due to: ", error)
    }
    finally{
        (await connection).release()
    }
}

module.exports = generateExceptions