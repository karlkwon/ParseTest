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
    
        var dataForDay = {
        	labels : ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23"],
            // labels : getLabelForHour(),
        	datasets : [
        		{
        		    type:"Line",
        			fillColor : "rgba(151,187,151,0.5)",
			        strokeColor : "rgba(151,187,151,1)",
			        pointColor : "rgba(151,187,151,1)",
			        pointStrokeColor : "#fff",
        			data: [
        			    /*
                        {% for d in Data.acc %}
                            '{{ d.1 }}',
                            {% endfor %}
                            */
                        ]
                        
        		}
        	]
        } 
        
        var dataForWeek = {
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
        
        var dayChartOptions = {
            annotateDisplay : true,
            detectAnnotateOnFullLine : true,
            
            annotateLabel: annotateForDaily,
            /*
            // yAxis
            scaleOverride : true,
            scaleSteps: 35,
            scaleStepWidth: Math.round((Math.max.apply(null,dataForDay.datasets[0].data) - Math.min.apply(null,dataForDay.datasets[0].data)) / 35),
            scaleStartValue: Math.min.apply(null,dataForDay.datasets[0].data),
            */
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