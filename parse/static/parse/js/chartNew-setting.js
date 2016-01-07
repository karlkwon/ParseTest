//
// Data
//
var dayChartData = {
	labels : ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23"],
    // labels : getLabelForHour(),
	datasets : [
		{
		    type:"Line",
		    //type:"Bar",
			fillColor : "rgba(151,187,151,0.5)",
	        strokeColor : "rgba(151,187,151,1)",
	        pointColor : "rgba(151,187,151,1)",
	        pointStrokeColor : "#fff",
			data: []
		}
	]
} 
    
var weekChartData = {
	labels : ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
	datasets : [
		{
		    type:"Line",
		    title:"Current",
			fillColor : "rgba(151,187,151,0.5)",
	        strokeColor : "rgba(151,187,151,1)",
	        pointColor : "rgba(151,187,151,1)",
	        pointStrokeColor : "#fff",
			data: []
		},
		{
		    type:"Line",
		    title:"Target",
		    fillColor : "rgba(151,187,205,0.5)",
	        strokeColor : "rgba(151,187,205,1)",
	        pointColor : "rgba(151,187,205,1)",
	        pointStrokeColor : "#fff",
			data: []
		}
	]
} 
    
var updateChartData = {
    labels : ["-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-"],
    // labels : ["-"],
	datasets : [
		{
		    type:"Line",
		    title:"",
			fillColor : "#db343a",
	        strokeColor : "#db3434",
	        pointColor : "#db3434",
	        pointStrokeColor : "#fff",
			data:[]
		}
	]
};

var doughnutChartData = [
    {
        value : 30,
        color: "rgba(105,52,219,1)",
        title : "Today"
    },
    {
        value : 100,
        color: "#C0C0C0",
        title : "Total"
    }
];


//
// Options
//
var doughnutChartOptions = {
      responsive: true,
      animationStartWithDataset : 1,
      animationStartWithData : 1,
      animateRotate : true,
      animateScale : true,
      animationByData : true,
      animationSteps : 100,
      animationEasing: "easeOutQuad",
      percentageInnerCutout:76,
      //canvasBorders : true,
      //canvasBordersWidth : 3,
      //canvasBordersColor : "black",
      //graphTitle : "No title",
      legend : true,
      inGraphDataShow : false,
      annotateDisplay : false,
      spaceBetweenBar : 5,
      graphTitleFontSize: 18,
      crossText :["70%"],
      crossTextAlign :["center"],
      crossTextBaseline :["middle"],
      crossTextFontColor:["rgba(52,152,219,1)"],crossTextFontSize:[15]
};

var dayChartOptions = {
    annotateDisplay : true,
    detectAnnotateOnFullLine : true,
    //annotateLabel: annotateForDailyBar,
    annotateLabel: annotateForDaily,
    // yAxis
    scaleOverride : true,
    scaleSteps: 10,
    scaleStepWidth: 5,
    scaleStartValue: 0,
    
    bezierCurve : false,
    responsive: true,
    maintainAspectRatio: true,          
    legend: true,
    datasetFill: false,
    showXLabels : 1,
    firstLabelToShow : -3,
    //graphTitle : "Electric power",
    xAxisLabel: "hour",
    yAxisLabel: "Wh",
    yAxisMinimumInterval: 1,          
    rotateLabels: 0,
    barValueSpacing: 2,
    xAxisLabelSpaceBefore: 0,
    xAxisSpaceAfter: 0,
    graphSpaceAfter: 0
};
    
var weekChartOptions = {
    legend : true,
 
    annotateDisplay : true,
    //detectAnnotateOnFullLine : true,
    //annotateLabel: annotateForWeekly,
    
    // yAxis
    scaleOverride : true,
    scaleSteps: 10,
    scaleStepWidth: 10,
    scaleStartValue: 0,
    
    bezierCurve : false,
    responsive: true,
    maintainAspectRatio: true,          
    legend: true,
    datasetFill: false,
    showXLabels : 1,
    firstLabelToShow : -3,
    //graphTitle : "Electric power",
    xAxisLabel: "week",
    yAxisLabel: "Wh",
    yAxisMinimumInterval: 1,          
    rotateLabels: 0,
    barValueSpacing: 2,
    xAxisLabelSpaceBefore: 0,
    xAxisSpaceAfter: 0,
    graphSpaceAfter: 0
};

var updateChartOptions = {
    scaleOverride : true,
    scaleSteps: 10,
    scaleStepWidth: 50,
    scaleStartValue: 0,
    
    datasetFill : false,
    annotateLabel: annotateForDaily,
    annotateDisplay : true,
   	responsive : true,
	bezierCurve : false,
	animation : true,
	animationStartWithDataset : 1,
    animationStartWithData : 1,
    animationLeftToRight : true,
    animationByDataset : true,
    xAxisLabel: "min",
    yAxisLabel: "W",
    
    scaleOverride: true,
	scaleSteps: 10,
	scaleStepWidth: 10,
	scaleStartValue: 0,
};


function annotateForWeekly(area,ctx,data,statData,posi,posj,othervars) {
    retstring=statData[posi][posj].v2+'<BR>';
    	    
    /*	retstring=retstring+'<BR><U>Line Data:</U><BR>'; */
        	
    for(var i=0;i<data.datasets.length;i++){
        if(typeof statData[i][posj].datavalue!="undefined" && data.datasets[i].type == "Line") {
    	    retstring=retstring+statData[i][posj].v1+" = "+statData[i][posj].datavalue+"<BR>";
        }
    }
    	
    return "<%='"+retstring+"'%>";
}

function annotateForDaily(area,ctx,data,statData,posi,posj,othervars) {
    retstring=statData[posi][posj].v2+'<BR>';
    	    
    /*	retstring=retstring+'<BR><U>Line Data:</U><BR>'; */
        	
    for(var i=0;i<data.datasets.length;i++){
        if(typeof statData[i][posj].datavalue!="undefined" && data.datasets[i].type == "Line") {
    	   // retstring=retstring+statData[i][posj].v1+"="+statData[i][posj].datavalue+"<BR>";
    	      retstring="["+statData[posi][posj].v2+"]  "+statData[i][posj].datavalue+" Wh<BR>";
        }
    }
    	
    return "<%='"+retstring+"'%>";
}

function annotateForDailyBar(area,ctx,data,statData,posi,posj,othervars) {
    retstring=statData[posi][posj].v2+'<BR>';
    	    
    /*	retstring=retstring+'<BR><U>Line Data:</U><BR>'; */
        	
    for(var i=0;i<data.datasets.length;i++){
        if(typeof statData[i][posj].datavalue!="undefined" && data.datasets[i].type == "Bar") {
    	   // retstring=retstring+statData[i][posj].v1+"="+statData[i][posj].datavalue+"<BR>";
    	      retstring="["+statData[posi][posj].v2+"]  "+statData[i][posj].datavalue+" Wh<BR>";
        }
    }
    	
    return "<%='"+retstring+"'%>";
}

function setScale(max, chartOptions) {
    if(max >= 50000) {
        chartOptions.scaleStepWidth = 150000 / chartOptions.scaleSteps;
    } else if(max >= 10000) {
        chartOptions.scaleStepWidth = 50000 / chartOptions.scaleSteps;
    } else if(max >= 5000) {
        chartOptions.scaleStepWidth = 10000 / chartOptions.scaleSteps;
    } else if(max >= 1000) {
        chartOptions.scaleStepWidth = 2000 / chartOptions.scaleSteps;
    } else if(max >= 500) {
        chartOptions.scaleStepWidth = 1000 / chartOptions.scaleSteps;
    } else if(max >= 200) {
        chartOptions.scaleStepWidth = 500 / chartOptions.scaleSteps;
    } else if(max >= 100) {
        chartOptions.scaleStepWidth = 200 / chartOptions.scaleSteps;
    } else if(max >= 50) {
        chartOptions.scaleStepWidth = 100 / chartOptions.scaleSteps;
    } else {
        chartOptions.scaleStepWidth = 50 / chartOptions.scaleSteps;
    }
    
    chartOptions.scaleStartValue = 0;
}


function setDayChartData(data) {
    dayChartData.datasets[0].data.splice(0,24);
    var valuesWithZero = [];
      
    for(var i = 0; i<Object.keys(data).length;i++) {
        if(data[i] != 0) {
             dayChartData.datasets[0].data[i] = (data[i] / 1000 ).toFixed(2);
        }
        
        valuesWithZero[i] = dayChartData.datasets[0].data[i];
    
        if(typeof valuesWithZero[i] == "undefined") {
            valuesWithZero[i] = 0;
        }        
    }
    setScale(Math.max.apply(null ,valuesWithZero), dayChartOptions);
}

function setWeekChartData(data) {
    var maxList = [];
    var curData = [];
    var targData = [];
    
    for(var i=0; i<7 ;i++) {
        if(typeof data.current[i] == "undefined"){
            weekChartData.datasets[0].data[i] = 0;
        } else if(data.current[i] != 0) {
            weekChartData.datasets[0].data[i] = (data.current[i] / 1000).toFixed(2);
        } else {
            weekChartData.datasets[0].data[i] = undefined;
        }
        
        if(typeof data.target[i] == "undefined"){
            weekChartData.datasets[1].data[i] = 0;
        } else if(data.target[i] != 0) {
            weekChartData.datasets[1].data[i] = (data.target[i] / 1000).toFixed(2);
        } else {
            weekChartData.datasets[1].data[i] = undefined;
        }
        
        curData[i] = weekChartData.datasets[0].data[i];
        targData[i] = weekChartData.datasets[1].data[i];
        
        if(typeof curData[i] == "undefined") {
            curData[i] = 0;
        }
        if(typeof targData[i] == "undefined") {
            targData[i] = 0;
        }
        
        if(curData[i] > targData[i]) {
            maxList[i] = curData[i]; 
        } else {
            maxList[i] = targData[i]; 
        }
    }
    
    setScale(Math.max.apply(null, maxList), weekChartOptions);
}

function setLiveChartData(data) {
    //console.log(data);
    var date = new Date();
    var nowHour = date.getHours();
    var nowMin = date.getMinutes();
    var labelArr = [];
    
    var curMin = nowHour*60 +nowMin;
    var inputData = new Object;
    
    for(var i=0; i<20; i++) {
        inputData[(curMin-i).toString()] = 0;
    }
    //console.log(inputData);
    
    for(var i=0; i<data.length; i++) {
        var time = Math.floor(data[i].time/100) * 60 + (data[i].time % 100);
        
        if(typeof inputData[time.toString()] != "undefined") {
            inputData[time.toString()] = data[i].value / 1000;
        }
        
        /* for Test
         if(typeof inputData[time.toString()] != "undefined") {
            inputData[time.toString()] = data[i].value / 1000;
            console.log(data[i].time + " " +time.toString() + " " + data[i].value / 1000);
        } else {
            console.log(data[i].time + " " + time.toString() + " " + inputData[time.toString()] + " is undefined");  
        }
        */
    }
    
    //console.log(inputData);
    /*
    var start = curMin;
    if(inputData[curMin] != 0) {
        start = curMin;
    } else {
        start = curMin -1;
    }*/
    
    var start = curMin;
    //console.log(start);
    for(var t=start-19; t<=start; t++) {
        labelArr[t-(start-19)] = (Math.floor(t/60)).toString() + ":" + (t%60).toString();
    }
    
    updateChartData.labels = labelArr;
    
    //console.log(labelArr);
    //console.log(inputData);
    
    var idx = 0;
    for(var key in inputData) {
        if(idx != 20)  {
            updateChartData.datasets[0].data[idx] = inputData[key];
            idx = idx + 1;
        }
    }
    
    setScale(Math.max.apply(null,updateChartData.datasets[0].data), updateChartOptions);
}

function setAverageChartData(data) {
    var percentage = ((data[data.length-1].TodaySpendEnergy_Wh * 100) / data[data.length-1].DailyAverageElectricPower_Wh).toFixed(0);
    
    doughnutChartOptions.crossText[0] = percentage.toString() + "%";
    doughnutChartData[0].value = percentage;
    doughnutChartData[1].value = 100-percentage;
}