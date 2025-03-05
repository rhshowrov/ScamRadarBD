from rest_framework.decorators import api_view, permission_classes,authentication_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated,AllowAny
from .serializers import PostCreateSerializer

@api_view(['POST'])
@authentication_classes([JWTAuthentication])  # Use JWT authentication
@permission_classes([IsAuthenticated])   # Ensure the user is authenticated
def create_post(request):
    if request.method == 'POST':
        # Pass the request context to the serializer
        serializer = PostCreateSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            # Save the post with the authenticated user
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        # Return errors if the data is invalid
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


