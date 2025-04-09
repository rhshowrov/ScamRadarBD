from rest_framework.decorators import api_view, permission_classes,authentication_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated,AllowAny
from .serializers import PostCreateSerializer
from rest_framework import viewsets
from .models import Place,Post,PostVote,PostImage,PostComment,Tag
from .serializers import PlaceSerializer,PostListSerializer,CommentSerializer
from django.db.models import Count, Q
from rest_framework import generics
from rest_framework import filters
from rest_framework.exceptions import APIException
from django.db.models.functions import Lower
@api_view(['POST'])
@authentication_classes([JWTAuthentication])  # Use JWT authentication
@permission_classes([IsAuthenticated])   # Ensure the user is authenticated
def create_post(request):
    if request.method == 'POST':
        # Pass the request context to the serializer
        print(request.data)
        serializer = PostCreateSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            # Save the post with the authenticated user
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        # Return errors if the data is invalid
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#no need to set decorators here since it is class view
class PlaceViewSet(viewsets.ModelViewSet):
    queryset=Place.objects.all()
    serializer_class=PlaceSerializer
    permission_classes=[IsAuthenticated]
    authentication_classes=[JWTAuthentication]

@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def PostListView(request):
    try:
        postList=Post.objects.all()
        serializer=PostListSerializer(postList,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error':str(e)},status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def getVoteCount(request, id):
    try:
        # Get the post object or return 404
        post = Post.objects.get(pk=id)
        user = request.user  # Authenticated user

        # Aggregate likes and dislikes
        votes = PostVote.objects.filter(post=post).aggregate(
            likes=Count('pk', filter=Q(vote_type='like')),
            dislikes=Count('pk', filter=Q(vote_type='dislike'))
        )
        comments=PostComment.objects.filter(post=post).count()
        # Ensure default values if no votes exist
        like_count = votes.get('likes', 0)
        dislike_count = votes.get('dislikes', 0)

        # Check if the authenticated user has liked the post
        likeStatus = PostVote.objects.filter(post=post, user=user, vote_type='like').exists()

        return Response({
            'id': post.id,
            'likes': like_count,
            'dislikes': dislike_count,
            'likeStatus': likeStatus,
            "comments":comments,
        }, status=status.HTTP_200_OK)

    except Post.DoesNotExist:
        return Response({'error': 'Post not found.'}, status=status.HTTP_404_NOT_FOUND)

    except Exception as e:
        return Response({'error': 'An error occurred while fetching vote count.'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def likeDislike(request, id):
    try:
        # Get the post object or return 404
        post = Post.objects.get(pk=id)
        user = request.user  # Authenticated user

        # Check if the user has already voted
        vote_status = PostVote.objects.filter(post=post, user=user).first()

        if vote_status:
            # Toggle between 'Like' and 'Dislike'
            if vote_status.vote_type == 'like':
                vote_status.vote_type = 'dislike'
            else:
                vote_status.vote_type = 'like'
            vote_status.save()
        else:
            # If no previous vote, create a new like
            PostVote.objects.create(post=post, user=user, vote_type='like')

        # Return the updated like status
        like_status = PostVote.objects.filter(post=post, user=user, vote_type='like').exists()
        # Aggregate likes and dislikes
        votes = PostVote.objects.filter(post=post).aggregate(
            likes=Count('pk', filter=Q(vote_type='like')),
            dislikes=Count('pk', filter=Q(vote_type='dislike'))
        )
        comments=PostComment.objects.filter(post=post).count()
        # Ensure default values if no votes exist
        like_count = votes.get('likes', 0)
        dislike_count = votes.get('dislikes', 0)
        return Response({
            'id': post.id,
            'likes': like_count,
            'dislikes': dislike_count,
            'likeStatus': like_status,
            "comments":comments,
        }, status=status.HTTP_200_OK)

    except Post.DoesNotExist:
        return Response({'error': 'Post not found.'}, status=status.HTTP_404_NOT_FOUND)

    except Exception as e:
        return Response({'error': 'An error occurred while updating vote.'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def postImageList(request,id):
    try:
        post=Post.objects.get(pk=id)
        postImages=PostImage.objects.filter(post=post)
        image_urls=[request.build_absolute_uri(postImage.image.url) for postImage in postImages]
        return Response({'images':image_urls},status=status.HTTP_200_OK)
    except Exception as e:
        # Log the error for debugging (optional)
        print(f"Error in getVoteCount: {str(e)}")
        return Response({'error': 'An error occurred'}, status=status.HTTP_400_BAD_REQUEST)



class CommentListCreateByPost(generics.ListCreateAPIView):
    serializer_class=CommentSerializer
    authentication_classes=[JWTAuthentication]
    permission_classes=[IsAuthenticated]

    def get_queryset(self):
        post_id=self.kwargs['post_id']
        comments=PostComment.objects.filter(post_id=post_id)
        return comments
    def perform_create(self, serializer):
        post_id = self.kwargs['post_id']
        serializer.save(user=self.request.user,post_id=post_id)


class SearchListView(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostListSerializer
    filter_backends = [filters.SearchFilter]
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_search_fields(self):
        search_fields = self.request.query_params.get('search_fields', '').split(',')
        valid_fields = [f for f in search_fields if f in [
            'user__username',
            'details',
            'tags__name',
            'link',
            'place__name',
            'location'
        ]]
        return valid_fields or ['details']

    def filter_queryset(self, queryset):
        search_term = self.request.query_params.get('search', None)
        if not search_term:
            return queryset.none()  # Return empty if no search term provided

        search_fields = self.get_search_fields()
        q_objects = Q()

        for field in search_fields:
            # For exact matching on specific fields
            if field in ['user__username', 'tags__name']:
                q_objects |= Q(**{f"{field}__iexact": search_term})
            else:
                q_objects |= Q(**{f"{field}__icontains": search_term})

        return queryset.filter(q_objects).distinct()


@api_view(['GET'])
@authentication_classes([JWTAuthentication])  # Use JWT authentication
@permission_classes([IsAuthenticated])    
def PostListByQuery(request):
    search_keyword = request.query_params.get('type')
    print(search_keyword)
    try:
        if search_keyword == 'trending':
            posts = Post.objects.annotate(
                like_count=Count('votes', filter=Q(votes__vote_type='like'), distinct=True),
                comment_count=Count('post_comments', distinct=True)
            ).order_by('-comment_count', '-like_count')
            print(f'Trending:{posts}')
        elif search_keyword == 'newest':
            posts = Post.objects.all().order_by('-created_at', '-updated_at')

        elif search_keyword == 'most_liked':
            posts = Post.objects.annotate(
                most_liked=Count('votes', filter=Q(votes__vote_type='like'), distinct=True)
            ).order_by('-most_liked')
            print(f'Liked:{posts}')
        elif search_keyword == 'most_commented':
            posts = Post.objects.annotate(
                most_commented=Count('post_comments', distinct=True)
            ).order_by('-most_commented')

        else:
            return Response(
                {'error': 'Invalid search keyword. Choose from trending, newest, most_liked, most_commented.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Serialize and return the response
        serializer = PostListSerializer(posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except APIException as e:  # Handles DRF-specific errors
        print(str(e))
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    except Exception as e:  # Catch all unexpected errors
        return Response({'error': 'Something went wrong. Please try again later.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@authentication_classes([JWTAuthentication])  # Use JWT authentication
@permission_classes([IsAuthenticated])
def dataAnalysis(request):
    tags = Tag.objects.annotate(post_count=Count('posts_tags')) \
                     .order_by('-post_count')[:10] \
                     .values_list('name', flat=True)
    print(f'Tags are:{tags}')
    site_links = Post.objects.values('link') \
                       .annotate(link_count=Count('id')) \
                       .order_by('-link_count')[:10] \
                       .values_list('link', flat=True)
    print(f'Site Links are:{site_links}')
    locations=Post.objects.annotate(normalized_locations=Lower('location')) \
              .values('normalized_locations') \
              .annotate(post_count=Count('id')) \
              .order_by('post_count')[:10]\
              .values_list('normalized_locations',flat=True)
    print(locations)
     # ✅ Send response as JSON
    return Response({
        'tags': list(tags),
        'site_links': list(site_links),
        'locations': list(locations),
    })
