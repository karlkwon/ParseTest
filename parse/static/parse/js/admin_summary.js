var X_Parse_Application_Id = "6599V3t4EzZy6D1UtfjDrFE8rc71TiYvAXowS1fM";
var X_Parse_JavaScript_API_Key = "PEdRsFUwNRj2mZo66UBmt9ZcSCvAHQ8O9PYvg3kI";
var X_Parse_Rest_API_Key = "SqF6YfaQTEGHVBGKFI7aQ3wACkqaSUv5IOWdwS1z";

var GROUP_ACC_ENERGY_ID_PREFIX = "group_acc_energy_";

var Parse;
function initialize(parse) {
   Parse = parse;
   Parse.initialize(X_Parse_Application_Id, X_Parse_JavaScript_API_Key);
}

var GroupSummaryInfo = new Object;

var totalAccumulatedEnergyConsumption = 0;

var groupInfoListForAPage = [];

var currentClientListPage = 1;
var GROUP_COUNT_IN_A_PAGE = 20;

function getDetailInfoPerGroup(index, start, end) {
	return jQuery.ajax({
        url : "/detailInfoPerGroup?groupId="+GroupSummaryInfo.groupList[index-1],
        method: 'GET'
    }).then(function(data) {
    	groupInfoListForAPage.push(data);
    	if(groupInfoListForAPage.length == (end-start+1)) {
    		drawClientListTable(start, end);
    		fillGroupAccEnergy();
    	}
    });
}

function fillGroupAccEnergy() {
    var AdminSummary = Parse.Object.extend("AdminSummary");
	
	for(var i = 0; i<groupInfoListForAPage.length; i++) {
	    var query = new Parse.Query(AdminSummary);
	    var processedGroupId = groupInfoListForAPage[i].groupId;
	    query.equalTo("groupId", processedGroupId);
	    query.find().then(
	        function(results) {
	            alert(processedGroupId + results.length)
	            if(results.length > 0) {
	                $('#'+GROUP_ACC_ENERGY_ID_PREFIX+processedGroupId).html(results[0].get("accumulated_energy_consumption"));    
	            }
	        }
	    );
	}
}

function drawAdminPage() {
    $('#totalNumOfGroup').html(GroupSummaryInfo.groupList.length);
	$('#totalNumOfDevice').html(GroupSummaryInfo.deviceList.length);
	calculateTotalEnergyConsumption();
    createClientList();
}

function createClientList() {
	var start = (currentClientListPage-1)*GROUP_COUNT_IN_A_PAGE + 1;
	var possible_end = currentClientListPage * GROUP_COUNT_IN_A_PAGE;
	var end = (GroupSummaryInfo.groupList.length > possible_end) ? possible_end : GroupSummaryInfo.groupList.length;
	
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
		html_text += '<td id="'+GROUP_ACC_ENERGY_ID_PREFIX+'"'+data.groupId+'>'+"N/A"+'</td>';
		html_text += '<td>'+data.Location+'</td>';
		
		html_text += '</tr>';
	}
	$("#client_list").html(html_text);
}

function initGroupSummaryInfo() {
	var AllDeviceList = Parse.Object.extend("AllDeviceList");
	var query = new Parse.Query(AllDeviceList);
	query.ascending("groupId");
	return query.find().then(
		function(results) {
			// Do something with the returned Parse.Object values
			var deviceList = [];
            var groupList = [];
			for (var i = 0; i < results.length; i++) {
			    var groupId = results[i].get('groupId');
				if(typeof groupId != "undefined") {
				    if(groupList.indexOf(groupId) < 0) {
						groupList.push(groupId);
					}
				    
				    var deviceId = results[i].get('deviceId');
					if(deviceList.indexOf(deviceId) < 0) {
					    if(typeof GroupSummaryInfo[groupId] == "undefined") {
					         GroupSummaryInfo[groupId] = new Object;
					         GroupSummaryInfo[groupId].devices = [];
					    }
					    GroupSummaryInfo[groupId].devices.push(deviceId);
						deviceList.push(results[i]);
					}				
				}
			}
			GroupSummaryInfo.deviceList = deviceList;
			GroupSummaryInfo.groupList = groupList;
			console.log(GroupSummaryInfo);
			return GroupSummaryInfo;
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
        	$('#totalAvgAccEnergy').html((temp_value/GroupSummaryInfo.groupList.length).toFixed(2)+' kWh');

    	},
    	function(error) {
    		alert("error");
    	}
    );
}