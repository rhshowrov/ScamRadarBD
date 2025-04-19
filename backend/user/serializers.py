from rest_framework import serializers
from .models import CustomUser 

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["username", "email", "mobile", "password"]
        extra_kwargs = {
            "password": {"write_only": True, "required": True},
            "username": {"required": True},
            "email": {"required": True},
            "mobile": {"required": True},
        }
        # since we ensure model lavel  validator for mobile
        # no need to define validate_<field_name> here
    def create(self,validated_data):
            # we can also do wthout pop just pass the whole validate data 
            password=validated_data.pop("password")
            print("serailizer create called!")
            user=CustomUser.objects.create_user(password=password,**validated_data)
            return user


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["username", "email", "mobile", "first_name", "last_name", "profile_pic"]
        extra_kwargs = {
            "username": {"required": False},
            "email": {"required": False},
            "mobile": {"required": False},
            "first_name": {"required": False},
            "last_name": {"required": False},
            "profile_pic": {"required": False},
        }
