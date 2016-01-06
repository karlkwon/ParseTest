/*
function getLastDayOfWeek(date) {
    console.log("getlastDayOfWeek() " + date);
    var cur = new Date();
    
    cur.setYear(Number(date.toString().substring(0,4)) + 1900);
    cur.setMonth(Number(date.toString().substring(4,6)) - 1);
    cur.setDate(Number(date.toString().substring(6,8)));
    
    var firstDay = cur.getDate() - cur.getDay();
    var lastDay = firstDay + 8;
    
    var result = cur.getYear();
    if(cur.getMonth() < 10) {
        result = result + '0'+ (cur.getMonth() + 1);
    } else {
        result = result + '' + (cur.getMonth() + 1);
    }
    
    if(lastDay < 10) {
        result = result + '0'+ lastDay;
    } else {
        result = result + '' + lastDay;
    }
    
    return result;
}
*/
function getLastDayOfWeek(date) {
    console.log("getlast() : "+ date);
    var dt = moment().set({'year': date.toString().substring(0,4), 
                           'month' : date.toString().substring(4,6) -1 ,
                           'day' :date.toString().substring(6,8)});
                    
    
    dt = dt.endOf('week');
    dt = dt.add(1,'days').format("YYYYMMDD");
    
    return dt;
}

function getToday() {
    var today = new Date();
    today =  today.toISOString().slice(0,10).replace(/-/g,"");
    
    return today;
}