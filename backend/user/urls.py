from django.urls import path
from .views import UserCreationView,UserLogin

urlpatterns = [
    path('signup/', UserCreationView,name="signup"),
    path('signin/', UserLogin,name="signin"),
    
]
