# Generated by Django 4.2.3 on 2023-07-11 16:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('theme', '0003_theme_votes'),
    ]

    operations = [
        migrations.CreateModel(
            name='Vote',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('voter', models.CharField(max_length=254, verbose_name='メールアドレス')),
                ('time', models.DateTimeField(auto_now_add=True, verbose_name='投票日時')),
                ('theme', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='theme.theme', verbose_name='テーマ')),
            ],
            options={
                'verbose_name': '投票',
                'verbose_name_plural': '投票',
            },
        ),
    ]