
from . import views
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.csrf import get_token
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.urls import path, include

def csrf_token(request):
    return JsonResponse({'csrfToken': get_token(request)})

urlpatterns = [
    path('signup/', views.UserCreateView.as_view()),
    path('login/', views.LoginAPIView.as_view()),
    path('logout/', views.LogoutAPIView.as_view()),
    path('csrf_token/', csrf_exempt(csrf_token)),
]
