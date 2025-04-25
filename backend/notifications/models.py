from django.db import models
from user.models import CustomUser
# Create your models here.
class Notifications(models.Model):
    user=models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    message=models.CharField(max_length=250)
    url=models.URLField(blank=True,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        print(f'{self.message} Read Status={self.is_read}')

