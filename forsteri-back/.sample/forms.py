from django.contrib.auth.forms import UserCreationForm
from .models import CustomUser
from .models import Message
from django import forms
from django.contrib.auth.models import User
from django.contrib.auth import forms as auth_forms

class CustomSignupForm(UserCreationForm):
    image = forms.ImageField(label=("image"))

    class Meta:
        model = CustomUser
        fields = ("username","email","password1","password2","image",)

# def clean_email(self):
#     email = self.cleaned_data.get("email")
#     if  not "@" in email 
#         raise forms.ValidationError(
#              self.error_messages['it is not e-mail address'],
#              code='it is not e-mail address',
#         )
#     return email
class LoginForm(auth_forms.AuthenticationForm):
    def __init__(self, *args, **kw):
        super().__init__(*args, **kw)
        for field in self.fields.values():
            field.widget.attrs['placeholder'] = field.label


class ChatForm(forms.ModelForm):
    class Meta:
        model = Message
        fields = ("message",)
        widgets = {
            'message': forms.TextInput(),
        }
        labels = {
            'message':'メッセージ',
        }

class UserNameChangeForm(forms.ModelForm):
    class Meta:
        model = CustomUser
        fields = ("username",)

    def __init__(self, username=None, *args, **kwargs):
        kwargs.setdefault('label_suffix', '')
        super().__init__(*args, **kwargs)
        # ユーザーの更新前情報をフォームに挿入
        if username:
            self.fields['username'].widget.attrs['value'] = username

    def update(self, user):
        user.username = self.cleaned_data['username']
        user.save()

class EmailChangeForm(forms.ModelForm):
    class Meta:
        model = CustomUser
        fields = ("email",)

    def __init__(self, email=None, *args, **kwargs):
        kwargs.setdefault('label_suffix', '')
        super().__init__(*args, **kwargs)
        # ユーザーの更新前情報をフォームに挿入
        if email:
            self.fields['email'].widget.attrs['value'] = email

    def update(self, user):
        user.email = self.cleaned_data['email']
        user.save()

class ImageChangeForm(forms.ModelForm):
    image = forms.ImageField(label=("image"))

    class Meta:
        model = CustomUser
        fields = ("image",)

    def __init__(self, image=None, *args, **kwargs):
        kwargs.setdefault('label_suffix', '')
        super().__init__(*args, **kwargs)
        # ユーザーの更新前情報をフォームに挿入
        if image:
            self.fields['image'].widget.attrs['value'] = image

    def update(self, user):
        user.image = self.cleaned_data['image']
        user.save()