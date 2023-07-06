from django.shortcuts import redirect, render
from django.views.generic import TemplateView
from django.contrib.auth.forms import UserCreationForm
from django.urls import reverse_lazy
from django.views.generic.edit import CreateView
from .forms import CustomSignupForm
from django.contrib.auth.views import LoginView,LogoutView
from  .forms import LoginForm,ChatForm,UserNameChangeForm,EmailChangeForm,ImageChangeForm
from django.contrib.auth.mixins import LoginRequiredMixin
from .models import CustomUser
from django.views.generic import DetailView
from django.views.generic import FormView
from .models import Message
from django import forms
from django.http import HttpRequest
from django.contrib.auth.views import PasswordChangeView, PasswordChangeDoneView


def index(request):
    return render(request, "myapp/index.html")

def signup_view(request):
    return render(request, "myapp/signup.html")

def login_view(request):
    return render(request, "myapp/login.html")

def friends(request):
    return render(request, "myapp/friends.html")

def talk_room(request):
    return render(request, "myapp/talk_room.html")

def setting(request):
    return render(request, "myapp/setting.html")

def logout(request):
    return render(request, "myapp/logout.html")

class UserCreateView(CreateView):
    template_name = 'myapp/signup.html'
    form_class = CustomSignupForm
    success_url = reverse_lazy('index')

class Login(LoginView):
    template_name = 'myapp/login.html'
    form_class = LoginForm

def Friends(request):
    template_name = "myapp/friends.html"
    ctx = {}
    qs = CustomUser.objects.all()
    ctx["object_list"] = qs

    return render(request, template_name, ctx)

class UserDetailView(DetailView):
    template_name = 'myapp/detail.html'
    model = CustomUser

def lists(request,pk):
    message_list = Message.objects.all()
    form = ChatForm(request.POST or None)
    id = pk
    room_name = CustomUser.objects.get(pk=id)
    user_name = request.user
    context = {
        'message_list':message_list,
        'form':form,
        'room_name':room_name,
    }
    if request.method == 'POST':
        if form.is_valid():

                # create()の場合
            Message.objects.create(
                message=form.cleaned_data['message'],
                sent_by=request.user,
                sent_to=CustomUser.objects.get(pk=id)
                )

            return render(request, 'myapp/detail.html', context)
    return render(request, 'myapp/detail.html', context)

        #送信者と送信相手を自動入力する。

class Logout(LogoutView):
    template_name = 'myapp/logout.html'

class PasswordChange(LoginRequiredMixin, PasswordChangeView):
    """パスワード変更ビュー"""
    success_url = reverse_lazy('change_done')
    template_name = 'myapp/password_change.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs) # 継承元のメソッドCALL
        context["form_name"] = "password_change"
        return context

class ChangeDone(LoginRequiredMixin,PasswordChangeDoneView):
    """パスワード変更完了"""
    template_name = 'myapp/change_done.html'

class UserNameChangeView(LoginRequiredMixin, FormView):
    template_name = 'myapp/change.html'
    form_class = UserNameChangeForm
    success_url = reverse_lazy('change_done')
    
    def form_valid(self, form):
        #formのupdateメソッドにログインユーザーを渡して更新
        form.update(user=self.request.user)
        return super().form_valid(form)

    def get_form_kwargs(self):
        kwargs = super().get_form_kwargs()
        # 更新前のユーザー情報をkwargsとして渡す
        kwargs.update({
            'username' : self.request.user.username,
        })
        return kwargs

class EmailChangeView(LoginRequiredMixin, FormView):
    template_name = 'myapp/change.html'
    form_class = EmailChangeForm
    success_url = reverse_lazy('change_done')
    
    def form_valid(self, form):
        #formのupdateメソッドにログインユーザーを渡して更新
        form.update(user=self.request.user)
        return super().form_valid(form)

    def get_form_kwargs(self):
        kwargs = super().get_form_kwargs()
        # 更新前のユーザー情報をkwargsとして渡す
        kwargs.update({
            'email' : self.request.user.email,
        })
        return kwargs

class ImageChangeView(LoginRequiredMixin, FormView):
    template_name = 'myapp/change.html'
    form_class = ImageChangeForm
    success_url = reverse_lazy('change_done')
    
    def form_valid(self, form):
        #formのupdateメソッドにログインユーザーを渡して更新
        form.update(user=self.request.user)
        return super().form_valid(form)

    def get_form_kwargs(self):
        kwargs = super().get_form_kwargs()
        # 更新前のユーザー情報をkwargsとして渡す
        kwargs.update({
            'image' : self.request.user.image,
        })
        return kwargs