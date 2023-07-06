
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from .models import Theme
from .forms import ThemeForm
from .serializers import ThemeSerializer


class CreateTheme(APIView):
    def post(self, request):
        serializer = ThemeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
        
