from django.urls import path, include
from .views import SignupView

urlpatterns = [
    path('auth/', include('djoser.urls.jwt')),
    path('signup/', SignupView.as_view(), name='signup'),
]
