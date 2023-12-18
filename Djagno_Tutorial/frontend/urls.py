from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('LogIn/', index),
    path('SignUp/', index)
]