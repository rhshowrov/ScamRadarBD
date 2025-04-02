from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name

class Place(models.Model):
    name = models.CharField(max_length=50, unique=True, help_text="Where the scam happened (Online, Facebook, etc.)")

    def __str__(self):
        return self.name

class Post(models.Model):
    STATUS_CHOICES = [
        ('published', 'Published'),
        ('flagged', 'Flagged'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    details = models.TextField(max_length=1000,blank=False)
    tags = models.ManyToManyField(Tag, related_name='posts', blank=True)
    location = models.CharField(max_length=100)
    link = models.CharField(max_length=50,blank=True, null=True)
    place = models.ForeignKey(Place, on_delete=models.SET_NULL, null=True, blank=True, related_name='posts')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='published')

    def __str__(self):
        return f'{self.user.username} added a post ID: {self.pk}'

class PostImage(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='scam_images/')

    def __str__(self):
        return f'Image for post {self.post.id}'

class PostComment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_comments')  # ✅ Unique R name
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='post_comments')  # ✅ Unique R name
    comment = models.TextField(max_length=500, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Comment by {self.user.username} on post {self.post.id}'

class PostVote(models.Model):
    VOTE_TYPES = [
        ('like', 'Like'),
        ('dislike', 'Dislike'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='votes')
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='votes')
    vote_type = models.CharField(max_length=7, choices=VOTE_TYPES)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['user', 'post']  # Ensure a user can only vote once per post

    def __str__(self):
        return f'{self.user.username} voted {self.vote_type} on post {self.post.id}'

class Report(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='reports')
    reported_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reports')
    reason = models.TextField(max_length=500, help_text="Reason for reporting the post.")
    created_at = models.DateTimeField(auto_now_add=True)
    resolved = models.BooleanField(default=False, help_text="Whether the report has been resolved by an admin.")

    def __str__(self):
        return f'Report on post {self.post.id} by {self.reported_by.username}'

    class Meta:
        ordering = ['-created_at']  # Show most recent reports first
