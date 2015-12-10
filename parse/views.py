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
    
    def get_queryset(self):
        connection = http.client.HTTPSConnection('api.parse.com', 443)
        params = urllib.parse.urlencode({"where":json.dumps({
        #        "deviceId":"wemo:insight:221443K12004E2",
               "deviceId":"wemo:insight:221443K1200046",
               "date":"20151103",
             })
            })
        
        connection.connect()
        connection.request('GET', '/1/classes/WeMo_Insight_Log?%s' % params, '', {
               "X-Parse-Application-Id": "",
               "X-Parse-REST-API-Key": ""
             })
        result = json.loads(connection.getresponse().read().decode('utf-8'))
        
        acc = [0]*60
        for ss in result.values():
            for s in ss:
                idx = int(int(s['time'])/60)
                acc[idx] = acc[idx] + int(s['current_spent_power_mw'])

        ret = list()
        for i in range(60):
            ret.append((i, acc[i]))
            
        return {'acc':ret}
        # return Score.objects.order_by('-score')
