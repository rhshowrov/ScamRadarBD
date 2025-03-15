from rest_framework.decorators import api_view, permission_classes,authentication_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated,AllowAny
from .serializers import PostCreateSerializer
from rest_framework import viewsets
from .models import Place,Post,PostVote
from .serializers import PlaceSerializer,PostListSerializer
from django.db.models import Count, Q
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
@authentication_classes([])
@permission_classes([AllowAny])
def PostListView(request):
    try:
        postList=Post.objects.all()
        serializer=PostListSerializer(postList,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error':str(e)},status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@authentication_classes([])
@permission_classes([AllowAny])
def getVoteCount(request, id):
    try:
        # Get the post object or raise a 404 if it doesn't exist
        post = Post.objects.get(pk=id)

        # Use aggregation to count likes and dislikes in a single query
        votes = PostVote.objects.filter(post=post).aggregate(
            likes=Count('pk', filter=Q(vote_type='like')),
            dislikes=Count('pk', filter=Q(vote_type='dislike'))
        )

        return Response({
            'id': post.id,
            'likes': votes['likes'],
            'dislikes': votes['dislikes']
        }, status=status.HTTP_200_OK)

    except Post.DoesNotExist:
        return Response({'error': 'Post not found.'}, status=status.HTTP_404_NOT_FOUND)

    except Exception as e:
        # Log the error for debugging (optional)
        print(f"Error in getVoteCount: {str(e)}")
        return Response({'error': 'An error occurred while fetching vote count.'}, status=status.HTTP_400_BAD_REQUEST)

        
