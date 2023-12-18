from django.urls import path
from .views import main,UserView,CreateUser,SignIn,CurrentUser,DeleteUser,LogOut

urlpatterns = [
    path('',main),
    path('all_users/', UserView.as_view()),
    path('new_user/',CreateUser.as_view()),
    path('sign_in/',SignIn.as_view()),
    path('getCurrentUser/',CurrentUser.as_view()),
    path('deleteUser/',DeleteUser.as_view()),
    path('logout/',LogOut.as_view())
    
]