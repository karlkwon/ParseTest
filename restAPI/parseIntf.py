import json, http.client, urllib
import datetime, time
 
PARSE_APPLICATION_ID    = "6599V3t4EzZy6D1UtfjDrFE8rc71TiYvAXowS1fM"
PARSE_REST_KEY_ID       = "SqF6YfaQTEGHVBGKFI7aQ3wACkqaSUv5IOWdwS1z"

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


    def getLastData(self, deviceId_, date_):
        print("PARAMS: ", deviceId_, date_)
        
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

        print("getLastData: ", result)

        return result


    def getWeeklyParseData(self, deviceId_, date_current):
        print("PARAMS: ", deviceId_, date_current)
        
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
        print("PARAMS: ", deviceId_, date_)
        
        connection = http.client.HTTPSConnection('api.parse.com', 443)
        params = urllib.parse.urlencode({"where":json.dumps({
              "deviceId":deviceId_,
              "date":date_,
              "time":{
                  "$gte": (nth*1200),
                  "$lt": ((nth+1)*1200)
                }
             }),
             "limit":720
            })
        
        connection.connect()
        connection.request('GET', '/1/classes/WeMoInsight?%s' % params, '', {
              "X-Parse-Application-Id": PARSE_APPLICATION_ID,
              "X-Parse-REST-API-Key": PARSE_REST_KEY_ID
             })

        result = json.loads(connection.getresponse().read().decode('utf-8'))

        return result


    def getDailyData(self, deviceId_, date_):
        result = self.getParseData(deviceId_, date_, 0).get('results') \
        + self.getParseData(deviceId_, date_, 1).get('results')
        
        acc = [0]*24
        print("size: ", len(result))
        for s in result:
            idx = int(int(s['time'])/100)
            acc[idx] = acc[idx] + int(s['current_spent_power_mw'])

        ret = dict()
        for i in range(24):
            ret[i] = acc[i]
            
        return ret

    def getWeeklyData(self, deviceId_, date_, targetDate_):
        totalRet = dict()
        
        result = self.getWeeklyParseData(deviceId_, date_).get('results') \
        + self.getLastData(deviceId_, date_).get('results')
        
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
