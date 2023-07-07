from rest_framework import generics, serializers
from .models import Theme
from rest_framework_simplejwt.tokens import AccessToken

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

class CreateTheme(generics.CreateAPIView):
    queryset = Theme.objects.all()
    serializer_class = ThemeSerializer

    def perform_create(self, serializer):
        token = self.request.META.get('HTTP_AUTHORIZATION', '').split()[1]
        decoded_token = AccessToken(token)
        user_id = decoded_token['user_id']
        user = User.objects.get(id=user_id)
        serializer.save(user=user)
    