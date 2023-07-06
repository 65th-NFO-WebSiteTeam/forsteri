from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):

    class Meta:
        app_label = 'home'

    groups = models.ManyToManyField(
        'auth.Group',
        related_name='custom_users',  # 適切なrelated_nameを設定する
        blank=True,
        verbose_name='groups',
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        related_query_name='custom_user',
    )


    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='custom_users',  # 適切なrelated_nameを設定する
        blank=True,
        verbose_name='user permissions',
        help_text='Specific permissions for this user.',
        related_query_name='custom_user',
    )