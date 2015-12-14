from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^chart', views.ChartView.as_view(), name='chart'),
]