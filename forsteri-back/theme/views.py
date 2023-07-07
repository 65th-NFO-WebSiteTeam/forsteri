from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from .models import Theme
from .forms import ThemeForm
from rest_framework import generics

from .models import Theme
from .serializers import ThemeSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication

class CreateTheme(generics.CreateAPIView):
    queryset = Theme.objects.all()
    serializer_class = ThemeSerializer
    authentication_classes = [JWTAuthentication]  # JWTAuthenticationを指定する

    def perform_create(self, serializer):
        user = self.request.user  # requestから直接userを取得する
        serializer.save(user=user)

class ThemeFormView(APIView):
    def get(self, request):
        form = ThemeForm()
        form_fields = []
        for field in form:
            field_data = {
                'name': field.name,
                'label': field.label,
                'field_type': field.field.widget.__class__.__name__,
                'required': field.field.required
            }
            form_fields.append(field_data)
        
        return Response(form_fields)


class ListTheme(APIView):
    def get(self, request):
        try:
            theme = Theme.objects.all()
            res_list = [
                {
                    'theme': d.theme,
                    'comment': d.comment,
                    'id': d.id,  # idフィールドを追加
                }
                for d in theme
            ]
            return Response(res_list)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class DetailTheme(APIView):
    def get(self, request, pk):
        try:
            try:
                theme = Theme.objects.get(id=pk)
            except:
                error_msg = "存在しないテーマです"
                return Response(error_msg, status=status.HTTP_404_NOT_FOUND)
            res = {
                'id': theme.id,
                'theme': theme.theme,
                'comment': theme.comment
            }
            return Response(res)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
