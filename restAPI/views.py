from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from restAPI.serializers import UserSerializer, GroupSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework.views import APIView

from .parseIntf import ParseIntf
import json

# http://www.django-rest-framework.org/

dataIntf = ParseIntf()

@api_view(['GET'])
def getData(request):
    if request.method == 'GET':
        date_ = request.GET.get('date', 20151103)
        deviceId_ = request.GET.get('deviceId', "wemo:insight:221443K1200046")

        data = dataIntf.getHourlyData(deviceId_, date_)
        
        print(data)

        if data is None:
            return Response({'url':'a', 'username':'b', 'email':'c', 'groups':'d', 'date':tmp})
        else:
            return Response(data)


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    