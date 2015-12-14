import json, http.client, urllib

class ParseIntf():
    def __init__(self):
        return
    
    def getDeviceIdList(self):
        return
    
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
            "X-Parse-Application-Id": "",    
            "X-Parse-REST-API-Key": ""
            })
        result = json.loads(connection.getresponse().read().decode('utf-8'))

        return result

    def getHourlyData(self, deviceId_, date_):
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
