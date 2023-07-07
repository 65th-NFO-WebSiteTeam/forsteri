from django.db import models
from home.models import UserProfile

class Theme(models.Model):
    theme = models.CharField('テーマ', max_length=100)
    comment = models.CharField('主意文', max_length=500)
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)

    def __str__(self):
        return self.theme