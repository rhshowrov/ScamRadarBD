from django.urls import path
from .views import UserCreationView,UserLogin,UserProfileUpdateView

urlpatterns = [
    path('signup/', UserCreationView,name="signup"),
    path('signin/', UserLogin,name="signin"),
    path('profile/',UserProfileUpdateView.as_view(),name='profile')
    
]
