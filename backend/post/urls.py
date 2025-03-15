from .views import create_post
from django.urls import path
from .views import PlaceViewSet,PostListView,getVoteCount
urlpatterns = [
    path('create_post/',create_post,name='create_post'),
    path('getplace/',PlaceViewSet.as_view({'get': 'list', 'post': 'create'}),name='get_place'),
    path('get_posts/',PostListView,name='get_post'),
    path('post_votes/<int:id>',getVoteCount,name='post_votes'),
    

]