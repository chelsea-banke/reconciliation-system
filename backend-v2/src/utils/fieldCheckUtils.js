const fieldChecker = (sale)=>{
    let status = {
        "valid": true,
        "fields": []
    }
    for (const feild in sale) {
        if (sale.hasOwnProperty(feild) && (
            sale[feild] === undefined || 
            sale[feild] === null || 
            sale[feild] === "")) {
          status["fields"].push(feild)
        }
    }

    if (status["fields"].length > 0){
        status["valid"] = false
    }
    return status
}

module.exports = fieldChecker