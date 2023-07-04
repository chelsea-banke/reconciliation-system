const duplicateCount = (sales)=>{
    let count = 0
    let tracker = {}
    sales.forEach(sale => {
      if(tracker[sale["messageId"]]==undefined){
        tracker[sale["messageId"]] = 0
      }  
      else{
        tracker[sale["messageId"]] += 1
        count+=1
      }
    })
    return(count)
}

module.exports = duplicateCount