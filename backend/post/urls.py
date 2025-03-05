from .views import create_post
from django.urls import path
urlpatterns = [
    path('create_post/',create_post,name='create_post'),

]