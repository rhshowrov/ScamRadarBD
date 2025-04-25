from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Post


@receiver(post_save,sender=Post)
def post_create_signal(sender,instance,created,**kwargs):
    if created:
        print(f'Post has been created by {instance.user}')

        