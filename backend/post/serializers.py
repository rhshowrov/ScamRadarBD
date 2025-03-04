from rest_framework import serializers
from .models import Post, Tag, Place, PostImage

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['name']

class PlaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Place
        fields = ['name']

class PostImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = ['image']

class PostSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True)  # Nested serializer for tags
    place = PlaceSerializer()  # Nested serializer for place
    images = PostImageSerializer(many=True, required=False)  # Nested serializer for images

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
        tags_data = validated_data.pop('tags', [])  # Handle tags
        place_data = validated_data.pop('place', None)  # Handle place
        images_data = validated_data.pop('images', [])  # Handle images

        # Get the user from the request
        user = self.context['request'].user

        # Create or get the Place object
        if place_data:
            place, _ = Place.objects.get_or_create(**place_data)
        else:
            place = None

        # Create the Post object
        post = Post.objects.create(user=user, place=place, **validated_data)

        # Add tags to the Post
        for tag_data in tags_data:
            tag, _ = Tag.objects.get_or_create(**tag_data)
            post.tags.add(tag)

        # Add images to the Post
        for image_data in images_data:
            PostImage.objects.create(post=post, **image_data)

        return post

    def update(self, instance, validated_data):
        # Extract nested data
        tags_data = validated_data.pop('tags', [])  # Handle tags
        place_data = validated_data.pop('place', None)  # Handle place
        images_data = validated_data.pop('images', [])  # Handle images

        # Update the Post object
        instance.details = validated_data.get('details', instance.details)
        instance.location = validated_data.get('location', instance.location)
        instance.link = validated_data.get('link', instance.link)
        instance.save()

        # Update or create the Place object
        if place_data:
            place, _ = Place.objects.get_or_create(**place_data)
            instance.place = place
            instance.save()

        # Update tags
        instance.tags.clear()
        for tag_data in tags_data:
            tag, _ = Tag.objects.get_or_create(**tag_data)
            instance.tags.add(tag)

        # Update images
        instance.images.all().delete()  # Delete existing images
        for image_data in images_data:
            PostImage.objects.create(post=instance, **image_data)

        return instance