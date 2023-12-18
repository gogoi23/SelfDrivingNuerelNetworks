from rest_framework import serializers
from .models import User


class userSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        #fields = ('id','email','password','created_at')
        fields = '__all__'


class AuthenticateUser(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email','password')
