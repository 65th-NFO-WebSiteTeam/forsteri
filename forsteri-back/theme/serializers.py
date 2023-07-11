from rest_framework import serializers
from .models import Theme
from home.models import UserProfile

class ThemeSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    class Meta:
        model = Theme
        fields = ('id', 'theme', 'comment', 'user')

    def get_user(self, obj):
        request = self.context.get('request')
        if request and hasattr(request, 'user'):
            return str(request.user)
        return None

    def create(self, validated_data):
        request = self.context.get('request')
        if request and hasattr(request, 'user') and request.user.is_authenticated:
            user = request.user
            validated_data['user'] = user
        return super().create(validated_data)
