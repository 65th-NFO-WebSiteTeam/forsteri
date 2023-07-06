from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static
from .views import UserCreateView
from .views import Login,Logout,PasswordChange,ChangeDone

urlpatterns = [
    path('', views.index, name='index'),
    path('signup', views.UserCreateView.as_view(), name='signup_view'),
    path('login', Login.as_view(), name='login_view'),
    path('friends', views.Friends, name='friends'),
    path('talk_room', views.talk_room, name='talk_room'),
    path('setting', views.setting, name='setting'),
    path('detail/<int:pk>/', views.lists, name="detail"),
    path('setting/logout', Logout.as_view(), name='logout_view'),
    path('setting/password_change/', views.PasswordChange.as_view(), name='password_change'), 
    path('setting/change/done/', views.ChangeDone.as_view(), name='change_done'), 
    path('setting/username_change/', views.UserNameChangeView.as_view(), name="username_change"),
    path('setting/email_change/', views.EmailChangeView.as_view(), name="email_change"),
    path('setting/image_change/', views.ImageChangeView.as_view(), name="image_change"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)