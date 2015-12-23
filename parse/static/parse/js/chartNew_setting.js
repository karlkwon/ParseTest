//
// Data
//
var dayChartData = {
	labels : ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23"],
    // labels : getLabelForHour(),
	datasets : [
		{
		    type:"Line",
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
    annotateLabel: annotateForDaily,
    // yAxis
    scaleOverride : true,
    scaleSteps: 10,
    scaleStepWidth: Math.round((Math.max.apply(null,dayChartData.datasets[0].data) - Math.min.apply(null,dayChartData.datasets[0].data)) / 10),
    scaleStartValue: Math.min.apply(null,dayChartData.datasets[0].data),
    
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
    //scaleOverride : true,
    //scaleSteps: 35,
    //scaleStepWidth: Math.round((Math.max.apply(null,dataForWeek.datasets[0].data) - Math.min.apply(null,dataForWeek.datasets[0].data)) / 35),
    //scaleStartValue: Math.min.apply(null,dataForWeek.datasets[0].data),
    
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
    yAxisLabel: "W"
    
	/*
      animationStartWithDataset : startWithDataset,
      animationStartWithData : startWithData,
      animation : false,
      animationLeftToRight : true,
      animationSteps : 20,
      animationEasing: "linear",
      canvasBorders : true,
      canvasBordersWidth : 3,
      canvasBordersColor : "black",
    graphTitle : "animation With Update",  
      legend : true,
//      inGraphDataShow : true,
      annotateDisplay : true,
      onAnimationComplete : startUpdate,
      graphTitleFontSize: 18, 
	responsive : true,
	scaleOverride: true,
	scaleSteps: 10,
	scaleStepWidth: 10,
	scaleStartValue: 0,
	fmtXLabel : "fmttime hh:mm:ss",
	animationCount: 1,
	animationPauseTime : 0,
	animationBackward: true
	*/
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
    	      retstring="["+statData[posi][posj].v2+"]  "+statData[i][posj].datavalue+" W<BR>";
        }
    }
    	
    return "<%='"+retstring+"'%>";
}