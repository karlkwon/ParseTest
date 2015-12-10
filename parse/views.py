from django.shortcuts import render
from django.http import HttpResponse
from django.template import RequestContext, loader
from django.views import generic

import json, http.client, urllib

# Create your views here.
def index(request):
    # return render(request, 'parse/index.html')
    return HttpResponse("Hello world !!!")
    
    
    
def updateData(request):

    connection = http.client.HTTPSConnection('api.parse.com', 443)
    connection.connect()
    connection.request('POST', '/1/classes/GameScore', json.dumps({
           "score": 1337,
           "playerName": "Sean Plott",
           "cheatMode": False
         }), {
           "X-Parse-Application-Id": "",
           "X-Parse-REST-API-Key": "",
           "Content-Type": "application/json"
         })
    
    results = json.loads(connection.getresponse().read().decode('utf-8'))

    return HttpResponse(str(results))
    
def getData(request):
    connection = http.client.HTTPSConnection('api.parse.com', 443)
    connection.connect()
    connection.request('GET', '/1/classes/GameScore/S1Wh1aOR2q', '', {
           "X-Parse-Application-Id": "",
           "X-Parse-REST-API-Key": ""
         })
         
    result = json.loads(connection.getresponse().read().decode('utf-8'))

    return HttpResponse(str(result))

class ChartView(generic.ListView):
    template_name = 'parse/index.html'
    context_object_name = 'Data'

    def getParseData(self, deviceId, date, nth):
        connection = http.client.HTTPSConnection('api.parse.com', 443)
        params = urllib.parse.urlencode({"where":json.dumps({
              "deviceId":deviceId,
              "date":date,
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
    
    def get_queryset(self):
        # "deviceId":"wemo:insight:221443K1200252",
        # "deviceId":"wemo:insight:221443K12004E2",
        # "deviceId":"wemo:insight:221443K1200046",
        result = self.getParseData("wemo:insight:221443K1200046", 20151103, 0).get('results') \
        + self.getParseData("wemo:insight:221443K1200046", 20151103, 1).get('results')

        acc = [0]*24
        print("size: ", len(result))
        for s in result:
            idx = int(int(s['time'])/100)
            acc[idx] = acc[idx] + int(s['current_spent_power_mw'])

        ret = list()
        for i in range(24):
            ret.append((i, acc[i]))
            
        return {'acc':ret}
        # return Score.objects.order_by('-score')
