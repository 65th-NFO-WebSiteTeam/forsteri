# Generated by Django 4.2.3 on 2023-07-11 13:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('theme', '0002_theme_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='theme',
            name='votes',
            field=models.IntegerField(default=0),
        ),
    ]
