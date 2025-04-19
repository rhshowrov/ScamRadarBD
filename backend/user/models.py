from django.db import models
from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin,BaseUserManager

from .validators import validate_mobile_number 
#manager for custom user
class CustomUserManager(BaseUserManager):
    def create_user(self,username,email,mobile,password=None,**extra_fields):
        if not username:
            raise ValueError('The Username field must be set')
        if not email:
            raise ValueError('The Email field must be set')
        if not mobile:
            raise ValueError('The Mobile field must be set')
        email=self.normalize_email(email=email)
        user=self.model(
            username=username,
            email=email,
            mobile=mobile,
            **extra_fields
        )
        user.set_password(password)
        user.save(self._db)
        return user
    
    def create_superuser(self, username, email, mobile, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(username, email, mobile, password, **extra_fields)


# Create your models here.
#custom user
class CustomUser(AbstractBaseUser,PermissionsMixin):
    username = models.CharField(max_length=30, unique=True)
    email = models.EmailField(unique=True)
    profile_pic=models.ImageField(upload_to='profile_pics/',default='profile_pics/profile.png')
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    mobile = models.CharField(max_length=11, validators=[validate_mobile_number],
                              help_text='Mobile number must contain exactly 11 digits.',
                              unique=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    #for mangaing the model "user.objects" 
    objects = CustomUserManager()
    # for telling that login usingin username
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'mobile']

    def __str__(self):
        return self.username