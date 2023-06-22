const formatDate = (date)=>{
    date = new Date(date);
    const month = date.getMonth() + 1; // Add 1 because month values are zero-based
    const day = date.getDate();
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

   return(formattedDate);
}

module.exports = formatDate