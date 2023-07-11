from django.urls import path
from . import views

urlpatterns = [
    path('', views.ListTheme.as_view()),  # テーマ一覧
    path('<int:pk>/', views.DetailTheme.as_view()),  # テーマの詳細
    path('form/', views.ThemeFormView.as_view()),  # フォームの入力部分のAPI
    path('create/', views.CreateTheme.as_view()), #テーマ作成
    path('vote/<int:pk>', views.VoteThemeView.as_view()),  # 投票API
]
