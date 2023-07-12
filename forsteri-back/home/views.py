from .serializers import MyTokenObtainPairSerializer #追加
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import SignupSerializer
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated

class SignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ObtainTokenPairWithColorView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class IsStaffView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        is_staff = request.user.is_staff
        return Response({"is_staff": is_staff})