from django.db import models
from home.models import CustomUser

# Create your models here.
class Theme(models.Model):
    theme = models.CharField('テーマ', max_length=100)#テーマ
    comment = models.CharField('主意文', max_length=500)#主意文