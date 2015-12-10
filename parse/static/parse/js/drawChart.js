function setColor(area,data,config,i,j,animPct,value)
{
  if(value > 35)return("rgba(220,0,0,"+animPct);
  else return("rgba(0,220,0,"+animPct);
}

function setData(arr) 
{
	console.log("setData()");
	for(var i = 0; i < arr.length;i++) {
		mydata1.datasets[0].data[i] = arr[i];		
	}	
}

var charJSPersonnalDefaultOptions = { decimalSeparator : "," , thousandSeparator : ".", roundNumber : "none", graphTitleFontSize: 2 };
/*
var mydata1 = {
	labels : ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23"],
	datasets : [
		{
			fillColor : "rgba(220,220,220,0.5)",
			strokeColor : "rgba(220,220,220,1)",
			pointColor : "rgba(220,220,220,1)",
			pointstrokeColor : "yellow",
			data: []
		//	data : [95,53,99,10,73,27,82,95,53,99,10,73,27,82,95,53,99,10,73,27,82,95,53,99],
      	//  title : "2014"
		}
/*				,
{
			fillColor : "rgba(151,187,205,0.5)",
			strokeColor : "rgba(151,187,205,1)",
			pointColor : "green",
			pointstrokeColor : "yellow",
			data : [35,43,59,,31,50,66],
      title : "2013"
		}

	]
}               
*/
var startWithDataset =1;
var startWithData =1;

 var barChartOptions1 = {
  		bezierCurve : false,
          responsive: true,
          maintainAspectRatio: true,          
		  legend: true,
          datasetFill: false,
          showXLabels : 1,
          firstLabelToShow : -3,
          graphTitle : "Electric power per hour",
          xAxisLabel: "Hour",
          yAxisLabel: "w",
          yAxisMinimumInterval: 1,          
          rotateLabels: 0,
          barValueSpacing: 2,
          xAxisLabelSpaceBefore: 0,
          xAxisSpaceAfter: 0,
          graphSpaceAfter: 0
        };
//var myLine = new Chart(document.getElementById("canvas").getContext("2d")).Line(mydata1,opt1);
