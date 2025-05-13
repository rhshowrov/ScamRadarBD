from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes,authentication_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated,AllowAny
from django.db.models import Count, Q
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from .models import Notifications
from .serializers import NotificationSerializer
from .paginations import CustomNotificationPagination
from django.shortcuts import get_object_or_404
# Create your views here.
# @api_view(['POST'])
# @authentication_classes([JWTAuthentication])  # Use JWT authentication
# @permission_classes([IsAuthenticated])
# def 
class NotificationListView(ListAPIView):
    queryset = Notifications.objects.all()
    serializer_class = NotificationSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    pagination_class = CustomNotificationPagination

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        unseen_notifications = queryset.filter(is_read=False).count()
        
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            response = self.get_paginated_response(serializer.data)
            response.data['unseen'] = unseen_notifications
            return response

        # ✳️ Manual consistency when pagination is not used
        serializer = self.get_serializer(queryset, many=True)
        return Response({
            "count": len(serializer.data),
            "next": None,
            "previous": None,
            "results": serializer.data,
            "unseen": unseen_notifications
        })

class NotificationReadView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        pk = kwargs.get('pk')  # ✅ use kwargs directly (not request.kwargs)
        notification_object = get_object_or_404(Notifications, pk=pk, user=user)

        # ✅ Save the updated object
        notification_object.is_read = True
        notification_object.save()

        return Response(
            {"message": "Successfully updated the notification status"},
            status=status.HTTP_200_OK
        )