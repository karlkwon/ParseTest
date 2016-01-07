function getLastDayOfWeek(date) {
    // console.log("getlast() : "+ date);
    var dt = moment().set({'year': date.toString().substring(0,4), 
                           'month' : date.toString().substring(4,6) -1 ,
                           'day' :date.toString().substring(6,8)});
                    
    
    dt = dt.endOf('week');
    // console.log(dt);
    dt = dt.add(1,'days').format("YYYYMMDD");
    // console.log("getlast() " + dt);
    return dt;
}

function getToday() {
    var today = new Date();
    today =  today.toISOString().slice(0,10).replace(/-/g,"");
    
    return today;
}