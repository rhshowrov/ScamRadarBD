from rest_framework import serializers
from .models import Post, Tag, Place, PostImage,PostComment
from user.models import CustomUser
class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['name']

class PlaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Place
        fields = ['id','name']

class PostImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = ['image']

class PostCreateSerializer(serializers.ModelSerializer):
    tags = serializers.ListField(
        child=serializers.CharField(max_length=50),
        write_only=True
    )
    place = serializers.PrimaryKeyRelatedField(queryset=Place.objects.all())
    images = serializers.ListField(
        child=serializers.ImageField(),
        write_only=True,
        required=False
    )

    class Meta:
        model = Post
        fields = '__all__'
        extra_kwargs = {
            'user': {'read_only': True},
            'created_at': {'read_only': True},
            'updated_at': {'read_only': True},
            'status': {'read_only': True},
        }
    
    def create(self, validated_data):
        # Extract nested data
        tags_data = validated_data.pop('tags', [])  # List of tag names (strings)
        place_data = validated_data.pop('place')  # Handle place
        images_data = validated_data.pop('images', [])  # Handle images
        # Get the user from the request
        user = self.context['request'].user
        
        # Create the Post object
        post = Post.objects.create(user=user, place=place_data, **validated_data)

        # Process tags: Get existing ones or create new ones
        tag_instances = []
        for tag_name in tags_data:
            tag, _ = Tag.objects.get_or_create(name=tag_name)  # Create if not exists
            tag_instances.append(tag)

        post.tags.set(tag_instances)  # Assign tags to post

        # Add images to the Post
        for image_data in images_data:
            PostImage.objects.create(post=post, image=image_data)

        return post



class PostListSerializer(serializers.ModelSerializer):
    user=serializers.CharField(source='user.username')
    place=serializers.CharField(source='place.name')
    tags = serializers.StringRelatedField(many=True)
    class Meta:
        model=Post
        exclude = ['updated_at','status']

class CommentSerializer(serializers.ModelSerializer):
    user=serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model=PostComment
        exclude =['post']