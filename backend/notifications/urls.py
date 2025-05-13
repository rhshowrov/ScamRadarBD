from django.urls import path,include
from .views import NotificationListView,NotificationReadView
urlpatterns=[
    path('get/',NotificationListView.as_view(),name='getnotification'),
    path('<int:pk>/read/',NotificationReadView.as_view(),name='read_notification'),

]