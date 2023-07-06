from .models import Theme
from django import forms
from django.contrib.auth.forms import UserCreationForm

class ThemeForm(forms.ModelForm):
    class Meta:
        model = Theme
        fields = ("theme","comment")
        widgets = {
            'theme': forms.TextInput(),
            'comment': forms.TextInput(),
        }
        labels = {
            'theme':'テーマ',
            'comment':'コメント',
        }