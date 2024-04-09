from django.contrib import admin
from django.urls import path
from .viewsets import (UserRegistrationView,UserLoginview,UserProfileView,
UserChangePassView,SendResetPasswordEmail,UserPassResetView,LogoutView)

urlpatterns = [
    path('register/',UserRegistrationView.as_view()),
    path('login/',UserLoginview.as_view()),
    path('profile/',UserProfileView.as_view()),
    path('changepassword/',UserChangePassView.as_view()),
    path('email/reset/',SendResetPasswordEmail.as_view()),
    path('reset-pass/<uid>/<token>/',UserPassResetView.as_view()),
    path('logout/',LogoutView.as_view()),
]
