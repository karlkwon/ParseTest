function annotateForWeekly(area,ctx,data,statData,posi,posj,othervars) {
    retstring=statData[posi][posj].v2+'<BR>';
    	    
    /*	retstring=retstring+'<BR><U>Line Data:</U><BR>'; */
        	
    for(var i=0;i<data.datasets.length;i++){
        if(typeof statData[i][posj].datavalue!="undefined" && data.datasets[i].type == "Line") {
    	    retstring=retstring+statData[i][posj].v1+"="+statData[i][posj].datavalue+"<BR>";
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
    	      retstring=statData[posi][posj].v2+"="+statData[i][posj].datavalue+"<BR>";
        }
    }
    	
    return "<%='"+retstring+"'%>";
}

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
    
var doughnutChartOptions = {
      responsive: true,
      animationStartWithDataset : 1,
      animationStartWithData : 1,
      animateRotate : true,
      animateScale : true,
      animationByData : true,
      animationSteps : 50,
      animationEasing: "linear",
      //canvasBorders : true,
      //canvasBordersWidth : 3,
      //canvasBordersColor : "black",
      graphTitle : "No title",
      //legend : true,
      inGraphDataShow : true,
      annotateDisplay : true,
      spaceBetweenBar : 5,
      graphTitleFontSize: 18
};

var updateChartData = {
    labels : ["-","-","-","-","-"],
	datasets : [
		{
		    type:"Line",
		    title:"",
			fillColor : "rgba(151,187,151,0.5)",
	        strokeColor : "rgba(151,187,151,1)",
	        pointColor : "rgba(151,187,151,1)",
	        pointStrokeColor : "#fff",
			data: [0,0,0,0,0]
		}
	]
};

var doughnutChartData = [
    {
        value : 30,
        color: "#D97041",
        title : "data1"
    },
    {
        value : 90,
        color: "#C7604C",
        title : "data2"
    },
    {
        value : 24,
        color: "#21323D",
        title : "data3"
    },
    {
        value : 58,
        color: "#9D9B7F",
        title : "data4"
    },
    {
        value : 82,
        color: "#7D4F6D",
        title : "data5"
    },
    {
        value : 8,
        color: "#584A5E",
        title : "data6"
    }
];
    
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
    graphTitle : "Electric power",
    xAxisLabel: "hour",
    yAxisLabel: "mW",
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
   // annotateLabel: annotateForWeekly,
    
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
    graphTitle : "Electric power",
    xAxisLabel: "week",
    yAxisLabel: "mW",
    yAxisMinimumInterval: 1,          
    rotateLabels: 0,
    barValueSpacing: 2,
    xAxisLabelSpaceBefore: 0,
    xAxisSpaceAfter: 0,
    graphSpaceAfter: 0
};

var updateChartOptions = {
   	responsive : true,
	bezierCurve : false,
	animation : true,
	 animationStartWithDataset : 1,
      animationStartWithData : 1,
      animationLeftToRight : true,
      animationByDataset : true
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