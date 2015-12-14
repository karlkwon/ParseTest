import json, http.client, urllib
import datetime, time

PARSE_APPLICATION_ID    = ""
PARSE_REST_KEY_ID       = ""

class ParseIntf():
    def __init__(self):
        return
    
    def getDeviceIdList(self):
        return
    
    def getDateFromInt(self, date_):
        return datetime(date_//10000, (date_//100)%100, date_%100)
    
    def getIntFromDate(self, date_):
        return date_.year*10000 + date_.month*100 + date_.day

    def getStartDayOfWeek(self, date_):
        
        return None

    def getWeeklyParseData(self, deviceId_, date_current):
        print("PARAMS: ", deviceId_, date_current)
        
        date_start = self.getDate(date_current, 7)
        
        connection = http.client.HTTPSConnection('api.parse.com', 443)
        params = urllib.parse.urlencode({"where":json.dumps({
               "deviceId":"wemo:insight:221443K12004E2",
               "date":{
                    "$gte": date_start,
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

    def getWeeklyData(self, deviceId_, date_):
        
        self.getWeeklyParseData(deviceId_, date_)
        
        for i in range(7):
            print(i)
        
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
