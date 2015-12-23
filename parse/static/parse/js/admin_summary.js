var X_Parse_Application_Id = "6599V3t4EzZy6D1UtfjDrFE8rc71TiYvAXowS1fM";
var X_Parse_JavaScript_API_Key = "PEdRsFUwNRj2mZo66UBmt9ZcSCvAHQ8O9PYvg3kI";
var X_Parse_Rest_API_Key = "SqF6YfaQTEGHVBGKFI7aQ3wACkqaSUv5IOWdwS1z";

var Parse;
function initialize(parse) {
   Parse = parse;
   Parse.initialize(X_Parse_Application_Id, X_Parse_JavaScript_API_Key);
}


var totalNumOfGroup;
var totalNumOfDevice;
var totalAccumulatedEnergyConsumption = 0;

var deviceList = [];
var groupList = [];
var groupInfoListForAPage = [];

var currentClientListPage = 1;
var GROUP_COUNT_IN_A_PAGE = 20;

function getDetailInfoPerGroup(index, start, end) {
	return jQuery.ajax({
        url : "/detailInfoPerGroup?groupId="+groupList[index-1],
        method: 'GET'
    }).then(function(data) {
    	groupInfoListForAPage.push(data);
    	if(groupInfoListForAPage.length == (end-start+1)) {
    		drawClientListTable(start, end);
    	}
    });
}

function createClientList() {
	var start = (currentClientListPage-1)*GROUP_COUNT_IN_A_PAGE + 1;
	var possible_end = currentClientListPage * GROUP_COUNT_IN_A_PAGE;
	var end = (totalNumOfGroup > possible_end) ? possible_end : totalNumOfGroup;
	
	groupInfoListForAPage = [];
	
	for(var idx = start; idx<=end; idx++) {
		getDetailInfoPerGroup(idx, start, end);
	}
}

function drawClientListTable(start, end) {
	var html_text = '';
	for(var idx = start; idx<=end; idx++) {
		html_text += '<tr>';
		
		
		var data = groupInfoListForAPage[idx-1];
		var url = "./chart?groupId="+data.groupId;
		html_text += '<td>'+idx+'</td>';
		html_text += '<td><a href="'+url+'">'+data.groupId+'</a></td>';
		html_text += '<td>'+data.numOfDevice+'</td>';
		html_text += '<td>'+"N/A"+'</td>';
		html_text += '<td>'+data.todayPowerConsumption+'</td>';
		html_text += '<td>'+data.thisMonthPowerConsumption+'</td>';
		html_text += '<td>'+"N/A"+'</td>';
		html_text += '<td>'+data.Location+'</td>';
		
		html_text += '</tr>';
	}
	$("#client_list").html(html_text);
}

function getAllDeviceList() {
	var AllDeviceList = Parse.Object.extend("AllDeviceList");
	var query = new Parse.Query(AllDeviceList);
	query.ascending("groupId");
	return query.find().then(
		function(results) {
			// Do something with the returned Parse.Object values
			deviceList = [];
			for (var i = 0; i < results.length; i++) {
				if(typeof results[i].get('groupId') != "undefined") {
					if(deviceList.indexOf(results[i].get('deviceId')) < 0) {
						deviceList.push(results[i]);
					}				
				}
			}
			
			return deviceList;
		},
		function(error) {			
			return undefined;
		}
	);
}

function calculateTotalEnergyConsumption() {
    jQuery.ajax({
        url : 'https://api.parse.com:443/1/functions/getTotalAccumulatedEnergyConsumption',
        dataType:'json',
        method: 'POST',
        headers: {  'X-Parse-Application-Id':X_Parse_Application_Id,
        	        'X-Parse-REST-API-Key'  :X_Parse_Rest_API_Key
        }
    }).then(
    	function(data) {
        	totalAccumulatedEnergyConsumption = data.result;
        	var temp_value = totalAccumulatedEnergyConsumption/60000000;
        	$('#totalAccEnergy').html(temp_value.toFixed(2)+' kWh');
        	$('#totalAvgAccEnergy').html((temp_value/totalNumOfGroup).toFixed(2)+' kWh');

    	},
    	function(error) {
    		alert("error");
    	}
    );
}