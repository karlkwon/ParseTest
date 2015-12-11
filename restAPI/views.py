from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from restAPI.serializers import UserSerializer, GroupSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework.views import APIView

# http://www.django-rest-framework.org/

@api_view(['GET'])
def getData(request):
    if request.method == 'GET':
        tmp = request.GET['date']
        
        if tmp is not None:
            return Response({'url':'a', 'username':'b', 'email':'c', 'groups':'d', 'date':tmp})
        else:
            return Response({'url':'a', 'username':'b', 'email':'c', 'groups':'d'})


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
    