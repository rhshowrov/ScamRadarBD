from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.contrib.staticfiles.urls import static 
urlpatterns = [
    path('/create_post/',include('user.urls')),

]