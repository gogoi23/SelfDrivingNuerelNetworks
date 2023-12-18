from django.db import models

# Create your models here.
class User(models.Model):
    email = models.CharField(max_length=150, default="Invalid", unique = True)
    password = models.CharField(max_length=40)
    created_at = models.DateTimeField(auto_now_add=True)

#python3 manage.py makemigrations
#python3 manage.py migrate 
