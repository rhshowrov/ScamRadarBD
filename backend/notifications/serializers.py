from rest_framework.serializers import ModelSerializer
from .models import Notifications
class NotificationSerializer(ModelSerializer):
    class Meta:
        model=Notifications
        fields='__all__'
