from rest_framework.decorators import api_view,permission_classes,authentication_classes
from rest_framework.authentication import authenticate
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
from .serializers import UserSerializer
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer
from .models import CustomUser
from django.contrib.auth import authenticate
@api_view(['POST'])
@permission_classes([AllowAny])
@authentication_classes([])
def UserCreationView(request):
    # Pass request.data to the serializer
    serializer = UserSerializer(data=request.data)
    
    # Validate the data
    if serializer.is_valid():
        # Save the user
        serializer.save()
        # Return the created user data
        return Response(data=serializer.data, status=status.HTTP_201_CREATED)
    
    # Return the first validation error if the data is invalid
    if serializer.errors:
        first_error_key = next(iter(serializer.errors))  # Get the first key
        first_error_message = serializer.errors[first_error_key][0]  # Get the first error message
        return Response(
            {"error": first_error_message},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # If no errors are found (unlikely), return a generic error
    return Response(
        {"error": "An unknown error occurred."},
        status=status.HTTP_400_BAD_REQUEST
    )

@api_view(['POST'])
@permission_classes([AllowAny])
@authentication_classes([])
def UserLogin(request):
    username=request.data.get('username')
    password=request.data.get('password')
    if not username or not password:
        return Response({"error": "Username and password are required."}, status=status.HTTP_400_BAD_REQUEST)
    user=authenticate(username=username,password=password)
    if user is not None:
        refresh=RefreshToken.for_user(user)
        return Response({'refresh':str(refresh),"access":str(refresh.access_token)},status=status.HTTP_200_OK)
    return Response({"error":'Invalid Credentials!!'},status=status.HTTP_401_UNAUTHORIZED)

