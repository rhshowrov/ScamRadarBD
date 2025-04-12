from django.contrib import admin
from .models import Post,Place,Tag,PostComment,PostVote,PostImage,Report,Bookmark
# Register your models here.
admin.site.register(Post)
admin.site.register(Place)
admin.site.register(Tag)
admin.site.register(PostComment)
admin.site.register(PostVote)
admin.site.register(PostImage)
admin.site.register(Report)
admin.site.register(Bookmark)