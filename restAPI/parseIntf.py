import collections
import json, http.client, urllib
import datetime, time
from operator import itemgetter, attrgetter, methodcaller
from .billCalculator import getBill
import pytz

# from datetime import datetime
from .parseKey import PARSE_APPLICATION_ID, PARSE_REST_KEY_ID
 
class ParseIntf():
    def __init__(self):
        return
    
    def getDeviceIdList(self):
        return
    
    def getDateFromInt(self, date_):
        return datetime.date(date_//10000, (date_//100)%100, date_%100)
    
    def getIntFromDate(self, date_):
        return date_.year*10000 + date_.month*100 + date_.day

    def getStartDayOfWeek(self, date_):
        weekday = date_.weekday()
        return date_ - datetime.timedelta(days=(weekday))

    def getStartDayOfThisMonth(self, date_):
        return date_ - datetime.timedelta(days=(date_.day))

    def makeAccumulatedDataInTime(self, data):
        count = [0]*24
        acc = [0]*24
        # print("size: ", len(data))
        for s in data:
            idx = int(int(s['time'])/100)
            acc[idx] = acc[idx] + int(s['current_spent_power_mw'])
            count[idx] += 1

        for idx in range(24):
            if count[idx] == 0:
                acc[idx] = 0
            else:
                acc[idx] /= count[idx]

        return acc, count

###############################################################################
##  parse access
###############################################################################
    def getCurrentParseData(self, deviceId_, numOfData = 1):
        print("PARSE: getCurrentParseData: ", deviceId_)
        
        connection = http.client.HTTPSConnection('api.parse.com', 443)
        params = urllib.parse.urlencode({"where":json.dumps({
               "deviceId":deviceId_
             }),
             "order":"-date,-time",
             "limit":numOfData
            })
        
        connection.connect()
        connection.request('GET', '/1/classes/WeMoInsight?%s' % params, '', {
               "X-Parse-Application-Id": PARSE_APPLICATION_ID,
               "X-Parse-REST-API-Key": PARSE_REST_KEY_ID
             })
        result = json.loads(connection.getresponse().read().decode('utf-8'))

        # print("getLastData: ", result)

        return result

    def getLastParseData(self, deviceId_, date_):
        print("PARSE: getLastParseData: ", deviceId_, date_)
        
        connection = http.client.HTTPSConnection('api.parse.com', 443)
        params = urllib.parse.urlencode({"where":json.dumps({
               "deviceId":deviceId_,
               "date":date_
             }),
             "order":"-time",
             "limit":1
            })
        
        connection.connect()
        connection.request('GET', '/1/classes/WeMoInsight?%s' % params, '', {
               "X-Parse-Application-Id": PARSE_APPLICATION_ID,
               "X-Parse-REST-API-Key": PARSE_REST_KEY_ID
             })
        result = json.loads(connection.getresponse().read().decode('utf-8'))

        # print("getLastData: ", result)

        return result


    def getLastParseDataBeforeSpecificDate(self, deviceId_, date_):
        print("PARSE: getLastParseDataBeforeSpecificDate: ", deviceId_, date_)
        
        connection = http.client.HTTPSConnection('api.parse.com', 443)
        params = urllib.parse.urlencode({"where":json.dumps({
               "deviceId":deviceId_,
               "date":{
                    "$lt": date_
                },
             }),
             "order":"-date,-time",
             "limit":1
            })
        
        connection.connect()
        connection.request('GET', '/1/classes/WeMoInsight?%s' % params, '', {
               "X-Parse-Application-Id": PARSE_APPLICATION_ID,
               "X-Parse-REST-API-Key": PARSE_REST_KEY_ID
             })
        result = json.loads(connection.getresponse().read().decode('utf-8'))

        # print("getLastData: ", result)

        return result


    def getWeeklyParseData(self, deviceId_, date_current):
        print("PARSE: getWeeklyParseData: ", deviceId_, date_current)
        
        ##  int to date
        start_date = self.getDateFromInt(date_current)
        ##  get start date
        start_date = self.getStartDayOfWeek(start_date)
        ##  date to int
        start_date_i = self.getIntFromDate(start_date)
        
        print("start_date_i: " , start_date_i, ", date_current: " , date_current)
        
        connection = http.client.HTTPSConnection('api.parse.com', 443)
        params = urllib.parse.urlencode({"where":json.dumps({
               "deviceId":deviceId_,
               "date":{
                    "$gte": start_date_i,
                    "$lte": date_current
                },
               "time":2359
             })
            })
        
        connection.connect()
        connection.request('GET', '/1/classes/WeMoInsight?%s' % params, '', {
               "X-Parse-Application-Id": PARSE_APPLICATION_ID,
               "X-Parse-REST-API-Key": PARSE_REST_KEY_ID
             })
        result = json.loads(connection.getresponse().read().decode('utf-8'))

        return result


    def getParseData(self, deviceId_, date_, nth):
        print("PARSE: getParseData: ", deviceId_, date_)
        
        connection = http.client.HTTPSConnection('api.parse.com', 443)
        params = urllib.parse.urlencode({"where":json.dumps({
              "deviceId":deviceId_,
              "date":date_,
              "time":{
                  "$gte": (nth*1200),
                  "$lt": ((nth+1)*1200)
                }
             }),
             "keys":"time,current_spent_power_mw",
             "limit":720
            })
        
        connection.connect()
        connection.request('GET', '/1/classes/WeMoInsight?%s' % params, '', {
              "X-Parse-Application-Id": PARSE_APPLICATION_ID,
              "X-Parse-REST-API-Key": PARSE_REST_KEY_ID
             })

        result = json.loads(connection.getresponse().read().decode('utf-8'))

        return result


    def getParseDeviceList(self, groupId_):
        print("PARSE: getParseDeviceList: ", groupId_)
        connection = http.client.HTTPSConnection('api.parse.com', 443)
        if groupId_ == 'All':
            params = urllib.parse.urlencode({
                "keys":"deviceId,groupId"
                })
        else:
            params = urllib.parse.urlencode({"where":json.dumps({
               "groupId":groupId_
             }), "keys":"deviceId,groupId"
             })

        connection.connect()
        connection.request('GET', '/1/classes/AllDeviceList?%s' % params, '', {
               "X-Parse-Application-Id": PARSE_APPLICATION_ID,
               "X-Parse-REST-API-Key": PARSE_REST_KEY_ID
             })
        result = json.loads(connection.getresponse().read().decode('utf-8'))

        tmp_data = result.get('results')
        
        groups = set()
        for d in tmp_data:
            if d.get('groupId') is None:
                continue
            groups.add(d['groupId'])

        devices = set()
        for d in tmp_data:
            if d.get('deviceId') is None:
                continue
            devices.add(d['deviceId'])

        return devices, groups


###############################################################################
##  api...
###############################################################################

    def getCurrentData(self, deviceId_):
        result = self.getCurrentParseData(deviceId_, 20).get('results')
        
        print("// getCurrentData: ", result)
        
        if len(result) == 0:
            return None
        
        ## need weight function...
        ret = list()
        
        for s in result:
            avg_wh = (s['total_spent_energy_mwmin'] / s['total_accumulated_use_time_sec']) * 3600 / 1000;
        
            ret.append({
                "date":s['date'], 
                "time":s['time'], 
                "value":s['current_spent_power_mw'], 
                "avgWh":round(avg_wh, 2)}
                )
        
        return ret

    def getCurrentWholeData(self, groupId):
        print("== getCurrentWholeData")
        
        ## make device list
        deviceList, groups = self.getParseDeviceList(groupId)
        
        ## combine result
        tmpRet = []
        for deviceId in deviceList:
            tmp = self.getCurrentData(deviceId)
            print(">> ", deviceId, " :: ", tmp)
            tmpRet = tmpRet + tmp
            
        tmpDict = collections.OrderedDict()
        for item in tmpRet:
            idx = item['date']*10000 + item['time']
            if idx in tmpDict.keys():
                tmpDict[idx]['value'] += item['value']
                tmpDict[idx]['avgWh'] += item['avgWh']
            else:
                tmpDict[idx] = item

        ret = []
        i = 0
        for k, v in tmpDict.items():
            ret.append(v)
            
        ret = list(ret)

        return ret[:20]

    def getDailyWholeData(self, groupId, date_):
        ## make device list
        deviceList, groups = self.getParseDeviceList(groupId)

        ## combine result
        accTotal = [0]*24
        for deviceId in deviceList:
            result = self.getParseData(deviceId, date_, 0).get('results') \
            + self.getParseData(deviceId, date_, 1).get('results')

            acc, count = self.makeAccumulatedDataInTime(result)

            for i in range(24):
                accTotal[i] += acc[i]
            
        tmpRet = dict()
        for i in range(24):
            tmpRet[i] = round(accTotal[i], 2)
            
        return tmpRet

    def getDailyData(self, deviceId_, date_):
        result = self.getParseData(deviceId_, date_, 0).get('results') \
        + self.getParseData(deviceId_, date_, 1).get('results')
        
        acc, count = self.makeAccumulatedDataInTime(result)

        ret = dict()
        for i in range(24):
            ret[i] = round(acc[i], 2)
            
        return ret

    def getWeeklyWholeData(self, groupId, date_, targetDate_):
        ## make device list
        deviceList, groups = self.getParseDeviceList(groupId)

        ## combine result
        tmpTotal = None
        ##  s is deviceId
        for deviceId in deviceList:
            tmpRet = self.getWeeklyData(deviceId, date_, targetDate_)

            if tmpTotal is None:
                tmpTotal = dict()

            ##  cat is current/target
            for cat in tmpRet.keys():
                subObj = tmpRet[cat]
                
                tmpObj = tmpTotal.get(cat)
                if tmpObj is None:
                    tmpObj = dict()
                    tmpTotal[cat] = tmpObj
                    
                for day in subObj.keys():
                    tmpObj[day] = tmpObj.get(day, 0) + subObj[day]
        
        return tmpTotal

    def getWeeklyData(self, deviceId_, date_, targetDate_):
        totalRet = dict()
        
        ##  get parse data of this week's last data for each day
        ##  and get today's data
        result = self.getWeeklyParseData(deviceId_, date_).get('results') \
        + self.getLastParseData(deviceId_, date_).get('results')
        
        acc = [0]*7
        for s in result:
            tmp_date = s.get('date')
            
            tmp_date_d = self.getDateFromInt(tmp_date)
            day_idx = tmp_date_d.weekday()
            acc[day_idx] = s.get('today_spent_energy_mv')

        ret = dict()
        for i in range(7):
            ret[i] = acc[i]
            
        totalRet['current'] = ret

        ##  get parse data of past week which inclede 'targetDate_'
        result = self.getWeeklyParseData(deviceId_, targetDate_).get('results')
        
        acc = [0]*7
        for s in result:
            tmp_date = s.get('date')
            
            tmp_date_d = self.getDateFromInt(tmp_date)
            day_idx = tmp_date_d.weekday()
            acc[day_idx] = s.get('today_spent_energy_mv')

        ret = dict()
        for i in range(7):
            ret[i] = acc[i]

        totalRet['target'] = ret
        
        return totalRet

    def getDeviceListData(self, groupId):
        
        result, groups = self.getParseDeviceList(groupId)

        return result, groups

    def getGroupInfo(self, groupId):
        ## make device list
        result, groups = self.getParseDeviceList(groupId)

        ret = list()
        
        ## make info per group
        deviceIds = set()
        todayPowerConsumption = 0
        currentPowerConsumption = 0
        thisMonthPowerConsumption = 0
        today = datetime.date.today()
        
        for deviceId in result:
            if deviceId in deviceIds:
                continue
            deviceIds.add(deviceId)
            
            ## get current data
            today_i = self.getIntFromDate(today)
            currentDatas = self.getLastParseData(deviceId, today_i).get('results')
            if len(currentDatas) == 0:
                currentData = None
            else:
                ## if time gap of between now and last data is greater than 3 min
                ## then don't use it.
                currentData = currentDatas[0]

                logDate_i = currentData.get('date') * 24 * 60
                logTime_i = currentData.get('time')
                logTime_im = logDate_i + int(logTime_i/100)*60 + logTime_i%100
                today_im = datetime.datetime.now(pytz.timezone('Asia/Seoul'))
                today_im = logDate_i + (today_im.hour)*60 + today_im.minute
                
                if abs(today_im - logTime_im) >= 5:
                    currentData = None
                
            ## get start day of this month's data
            ## last data of before this month's
            lastMonth = self.getStartDayOfThisMonth(today)
            lastMonth_i = self.getIntFromDate(lastMonth)
            lastMonthDatas = self.getLastParseDataBeforeSpecificDate(deviceId, lastMonth_i).get('results')
            if len(lastMonthDatas) == 0:
                lastMonthData = 0
            else:
                lastMonthData = lastMonthDatas[0].get('total_spent_energy_mwmin')

            ## this month's last data.
            thisMonthDatas = self.getLastParseDataBeforeSpecificDate(deviceId, today_i).get('results')
            if len(thisMonthDatas) == 0:
                thisMonthUsage = 0
            else:
                thisMonthUsage = thisMonthDatas[0].get('total_spent_energy_mwmin')
                
                print("last Month: ", lastMonthDatas[0])
                print("this Month: ", thisMonthDatas[0])
                print("++ ", deviceId, " : ", thisMonthUsage, ", ", lastMonthData)
                
                if thisMonthUsage > lastMonthData:
                    thisMonthUsage -= lastMonthData
                thisMonthPowerConsumption = thisMonthPowerConsumption + thisMonthUsage/1000/60/1000

            if currentData is not None:
                tmpTodayPowerConsumption = currentData.get('today_spent_energy_mv')
                if tmpTodayPowerConsumption is not None:
                    todayPowerConsumption += tmpTodayPowerConsumption
                    
                tmpCurrentPowerConsumption = currentData.get('current_spent_power_mw')
                if tmpCurrentPowerConsumption is not None:
                    currentPowerConsumption += tmpCurrentPowerConsumption
        
        return {"groupId":groupId,
                "numOfDevice":len(deviceIds),
                "todayPowerConsumption_mWmin":todayPowerConsumption,
                "currentPowerConsumption_mWmin":currentPowerConsumption,
                "thisMonthPowerConsumption_kWh":round(thisMonthPowerConsumption,2),
                "Location":"seoul"}


    def getDetailInfoForDevice(self, groupId):
        # get device list
        result, groups = self.getParseDeviceList(groupId)
        # result = result.get('results')
        
        ret = list()
        
        # get device info
        dailyAverageUsage = 0
        accumulatedPower = 0
        accumulateTodayPower = 0
        deviceIds = set()
        for deviceId in result:
            if deviceId in deviceIds:
                continue
            deviceIds.add(deviceId)

            currentDatas = self.getCurrentParseData(deviceId).get('results')
            currentData = currentDatas[0]

            ageInDay = currentData['accumulated_time_from_registered_sec']/60/60/24 + 1 # day
            todayUseTime = currentData['today_accumulated_use_time_sec']
            totalUseTime = currentData['total_accumulated_use_time_sec']    # sec
            avgPower = (currentData['total_spent_energy_mwmin']/60/1000)/currentData['total_accumulated_use_time_sec']  ## Wh per sec
            thisMonthPower = (avgPower / 1000 * 24 * 30 * 3600)    ##  kWh
            
            accumulatedPower = accumulatedPower + thisMonthPower
            dailyAverageUsage = dailyAverageUsage + avgPower*3600*24
            accumulateTodayPower = accumulateTodayPower + currentData['today_spent_energy_mv']

            print("ageInDay: ", ageInDay)
            print("avgPower: ", avgPower)
            
            ret.append({"GroupId":groupId,
                        "DeviceId":deviceId,
                        "TodayUseTime_sec":todayUseTime,
                        "DailyAvgUseTime_min":round(totalUseTime/60/ageInDay, 2),
                        "CurrentElectricPower_mWmin":currentData['current_spent_power_mw'],
                        "AverageElectricPower_Wh":round(avgPower * 3600, 2),
                        "ExpectedMonthlyElectricPower_kWh":round(thisMonthPower, 2),
            })

        thisMonthBill = getBill(accumulatedPower)
        ret.append({"GroupId":"TOTAL",
            "DeviceId":"TOTAL",
            "ExpectedMonthlyElectricPower_kWh":accumulatedPower,
            "ExpectedMonthlyElectricBill":thisMonthBill,
            "DailyAverageElectricPower_Wh":dailyAverageUsage,
            "TodaySpendEnergy_Wh":round(accumulateTodayPower/1000/60, 2),
        })
        
        return ret
        
