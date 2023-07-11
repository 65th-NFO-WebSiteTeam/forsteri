from django.db import models
from home.models import UserProfile

class Theme(models.Model):
    theme = models.CharField('テーマ', max_length=100)
    comment = models.CharField('主意文', max_length=500)
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    votes = models.IntegerField(default=0)

    def __str__(self):
        return self.theme
    

class Vote(models.Model):
    class Meta(object):
        verbose_name = "投票"
        verbose_name_plural = "投票"

    theme = models.ForeignKey(
        Theme,
        on_delete=models.CASCADE,
        verbose_name='テーマ'
    )

    voter = models.CharField(
        max_length=254,
        verbose_name='メールアドレス'
    )


    time = models.DateTimeField(
        auto_now_add=True,
        verbose_name='投票日時'
    )