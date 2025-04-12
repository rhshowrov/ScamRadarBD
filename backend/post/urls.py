from .views import create_post
from django.urls import path
from .views import PlaceViewSet,dataAnalysis,PostListView,getVoteCount,postImageList,likeDislike,CommentListCreateByPost,SearchListView,PostListByQuery,ToggleBookmark

urlpatterns = [
    path('create_post/',create_post,name='create_post'),
    path('getplace/',PlaceViewSet.as_view({'get': 'list', 'post': 'create'}),name='get_place'),
    path('get_posts/',PostListView,name='get_post'),
    path('post_votes/<int:id>',getVoteCount,name='post_votes'),
    path('post_images/<int:id>',postImageList,name='post_images'),
    path('like_dislike/<int:id>',likeDislike,name='likeDislike'),
    path('comments/<int:post_id>',CommentListCreateByPost.as_view(),name='commentsListCreate'),
    path('search_post/',SearchListView.as_view(),name='search_post'),
    path('get_sorted_posts/',PostListByQuery,name='filtered_posts'),
    path('get_analyzed_data/',dataAnalysis,name='analyzed_data'),
    path('bookmark/<int:pk>',ToggleBookmark.as_view(),name='toggleBookmark'),

]