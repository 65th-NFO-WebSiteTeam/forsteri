from .views import Login,Something
from django.contrib import admin
from django.urls import path, include



urlpatterns = [
    path('login/', Login.as_view()),
    path('data/', Something.as_view())

]
