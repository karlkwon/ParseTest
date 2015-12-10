from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^set', views.updateData, name='updateData'),
    url(r'^get', views.getData, name='getData'),
    url(r'^chart', views.ChartView.as_view(), name='chart'),
]