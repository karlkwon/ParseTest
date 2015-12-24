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
        date_ = request.GET.get('date', '20151103')
        date_ = int(date_)
        deviceId_ = request.GET.get('deviceId')
        groupId = request.GET.get('groupId', "A")
        
        if deviceId_ is None:
            data = dataIntf.getDailyWholeData(groupId, date_)
        else:
            data = dataIntf.getDailyData(deviceId_, date_)

        print(data)

        return Response(data)

@api_view(['GET'])
def getDailyData(request):
    return getData(request)

@api_view(['GET'])
def getDailyWholeData(request):
    if request.method == 'GET':
        date_ = request.GET.get('date', '20151103')
        date_ = int(date_)
        groupId = request.GET.get('groupId', "A")
        data = dataIntf.getDailyWholeData(groupId, date_)

        print(data)

        return Response(data)

@api_view(['GET'])
def getWeeklyData(request):
    if request.method == 'GET':
        date_ = request.GET.get('date', '20151110')
        date_ = int(date_)
        targetDate_ = request.GET.get('targetDate', '20151108')
        targetDate_ = int(targetDate_)
        deviceId_ = request.GET.get('deviceId')
        groupId = request.GET.get('groupId', "A")
        
        if deviceId_ is None:
            data = dataIntf.getWeeklyWholeData(groupId, date_, targetDate_)
        else:
            data = dataIntf.getWeeklyData(deviceId_, date_, targetDate_)

        print(data)

        return Response(data)

@api_view(['GET'])
def getWeeklyWholeData(request):
    if request.method == 'GET':
        date_ = request.GET.get('date', '20151110')
        date_ = int(date_)
        targetDate_ = request.GET.get('targetDate', '20151108')
        targetDate_ = int(targetDate_)
        groupId = request.GET.get('groupId', "A")
        data = dataIntf.getWeeklyWholeData(groupId, date_, targetDate_)

        print(data)

        return Response(data)

@api_view(['GET'])
def getCurrentData(request):
    if request.method == 'GET':
        deviceId_ = request.GET.get('deviceId')
        groupId = request.GET.get('groupId', "A")
        
        if deviceId_ is None:
            data = dataIntf.getCurrentWholeData(groupId)
        else:
            data = dataIntf.getCurrentData(deviceId_)

        print(data)

        return Response(data)

@api_view(['GET'])
def getDeviceListData(request):
    if request.method == 'GET':
        groupId = request.GET.get('groupId','All')

        data, groups = dataIntf.getDeviceListData(groupId)

        print(data)

        return Response(data)
    
@api_view(['GET'])
def getDetailInfoPerGroup(request):
    if request.method == 'GET':
        groupId = request.GET.get('groupId', 'A')
        
        data = dataIntf.getGroupInfo(groupId)

        print(data)

        return Response(data)
    
@api_view(['GET'])
def getDetailInfoForDevice(request):
    if request.method == 'GET':
        groupId = request.GET.get('groupId', 'A')
        
        data = dataIntf.getDetailInfoForDevice(groupId)

        print(data)

        return Response(data)



# class UserViewSet(viewsets.ModelViewSet):
#     """
#     API endpoint that allows users to be viewed or edited.
#     """
#     queryset = User.objects.all().order_by('-date_joined')
#     serializer_class = UserSerializer

# class GroupViewSet(viewsets.ModelViewSet):
#     """
#     API endpoint that allows groups to be viewed or edited.
#     """
#     queryset = Group.objects.all()
#     serializer_class = GroupSerializer
    