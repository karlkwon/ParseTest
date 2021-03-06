"""parse_test URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import include, url
from django.contrib import admin

from django.conf.urls import url, include
from rest_framework import routers
from restAPI import views

# router = routers.DefaultRouter()
# router.register(r'users', views.UserViewSet)
# router.register(r'groups', views.GroupViewSet)

urlpatterns = [
    url(r'^parse/', include('parse.urls')),
    url(r'^admin/', include(admin.site.urls)),
    # url(r'^', include(router.urls)),
    url(r'^get', views.getData),
    url(r'^dailyUsage', views.getDailyData, name='restDailyUsage'),
    url(r'^dailyWholeUsage', views.getDailyWholeData, name='restDailyWholeUsage'),
    url(r'^weeklyUsage', views.getWeeklyData, name='restWeeklyUsage'),
    url(r'^weeklyWholeUsage', views.getWeeklyWholeData, name='restWeeklyWholeUsage'),
    url(r'^currentUsage', views.getCurrentData, name='restCurrentUsage'),
    url(r'^deviceList', views.getDeviceListData, name='restDeviceList'),
    url(r'^detailInfoPerGroup', views.getDetailInfoPerGroup, name='restDetailInfoPerGroup'),
    url(r'^detailInfoForDevice', views.getDetailInfoForDevice, name='restDetailInfoForDevice'),
    # url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
