from django.shortcuts import render
from django.http import HttpResponse
from django.template import RequestContext, loader
from django.views import generic

import json, http.client, urllib

from restAPI.parseIntf import PARSE_APPLICATION_ID, PARSE_REST_KEY_ID

# Create your views here.
def index(request):
    # return render(request, 'parse/index.html')
    return HttpResponse("Hello world !!!")
    
class ChartView(generic.ListView):
    template_name = 'parse/index.html'
    context_object_name = 'Data'

    def get_queryset(self):
        # "deviceId":"wemo:insight:221443K1200252",
        # "deviceId":"wemo:insight:221443K12004E2",
        # "deviceId":"wemo:insight:221443K1200046",

        return {'acc': None}
