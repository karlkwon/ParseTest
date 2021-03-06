from django.shortcuts import render
from django.http import HttpResponse
from django.template import RequestContext, loader
from django.views import generic

import json, http.client, urllib

from restAPI.parseIntf import ParseIntf

parseIntf = ParseIntf()

# Create your views here.
class index(generic.ListView):
    template_name = 'parse/admin_summary.html'
    context_object_name = 'Data'

    def get_queryset(self):
        return {}
    
class ChartView(generic.ListView):
    template_name = 'parse/index.html'
    context_object_name = 'Data'

    def get_queryset(self):
        # "deviceId":"wemo:insight:221443K1200252",
        # "deviceId":"wemo:insight:221443K12004E2",
        # "deviceId":"wemo:insight:221443K1200046",
        
        groupId = self.request.GET.get('groupId', 'A')

        print("groupId: ", groupId)

        return {'groupId': groupId}
