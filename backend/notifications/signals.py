from django.db.models.signals import post_save
from django.dispatch import receiver
from post.models import PostComment
from .models import Notifications

@receiver(post_save,sender=PostComment)
def notify_on_comment(sender,instance,created,*args,**kwargs):
    #comment not created
    if not created:
            return
    
    #From post comment get The Post
    post=instance.post
    #get all the postComment that is associated with the Post
    all_comments=PostComment.objects.filter(post=post)
    post_owner=post.user

    # Notify post owner (but not if the commenter is the owner)
    if instance.user != post_owner:
                Notifications.objects.create(user=post_owner, \
                         message=f'{instance.user.username} commented on your post', url=f'/posts/details/{instance.post.id}')
    
    #using set to not notified twice a user
    notified_user=set([instance.user.id,post_owner.id])
    all_comments=PostComment.objects.filter(post=post)

    for post_comment in all_comments:
            if post_comment.user.id not in notified_user:
                    Notifications.objects.create(user=post_comment.user, \
                              message=f'{instance.user.username} also commented on a post you commented on',url=f'/posts/details/{instance.post.id}')
                    #adding commneter to the set
                    notified_user.add(post_comment.user.id)


    
