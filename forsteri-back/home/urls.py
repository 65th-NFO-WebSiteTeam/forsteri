from django.urls import path, include
from .views import SignupView,IsStaffView

urlpatterns = [
    path('auth/', include('djoser.urls.jwt')),
    path('signup/', SignupView.as_view(), name='signup'),
    path('isstaff/', IsStaffView.as_view(), name='isstaff'),
]
