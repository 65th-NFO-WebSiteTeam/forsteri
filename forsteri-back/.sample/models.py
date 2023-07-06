from django.db import models
from django.contrib.auth.models import AbstractUser
from django_currentuser.db.models import CurrentUserField

# Create your models here.

class CustomUser(AbstractUser):

    image = models.ImageField(upload_to="img/")

class Message(models.Model):
    message = models.CharField('メッセージ', max_length=500)#何を送ったか
    sent_by = models.ForeignKey(CustomUser, on_delete = models.CASCADE, related_name='sent_by')
    sent_at = models.DateTimeField(auto_now=True)
    sent_to = models.ForeignKey(CustomUser, on_delete = models.CASCADE,  related_name='sent_to')