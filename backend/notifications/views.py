from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes,authentication_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated,AllowAny
from django.db.models import Count, Q

# Create your views here.
# @api_view(['POST'])
# @authentication_classes([JWTAuthentication])  # Use JWT authentication
# @permission_classes([IsAuthenticated])
# def 