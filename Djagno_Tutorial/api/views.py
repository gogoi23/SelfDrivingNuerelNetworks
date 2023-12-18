from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics,status
from .serializers import userSerializer,AuthenticateUser
from .models import User
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.

class UserView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = userSerializer

#this needs a lot more work. 
#Does not do any verification 
#This can be used by anyone to delete any account
# this is very dangerous at the moment and this can not be deployed publicly
class DeleteUser(APIView):
    serializer_class = AuthenticateUser
    def post(self, request, format = None):
        try:
            selectedUser = User.objects.get(email=request.data['email'])
            selectedUser.delete()
            return Response({"success": "User deleted"}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"Error": "User does not exist"}, status=status.HTTP_200_OK)
            
        
class CreateUser(APIView):
    serializer_class = AuthenticateUser
    def post(self, request, format = None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        
        queryset = User.objects.filter(email = request.data['email'])
        
        if queryset.exists():
            return Response({"Error": "User already exists!"}, status=status.HTTP_400_BAD_REQUEST)

        else:
            serializer = self.serializer_class(data = request.data)
            if serializer.is_valid():
                email = serializer.data.get('email')
                password = serializer.data.get('password')
                newUser = User(email = email,password = password)
                newUser.save()
                self.request.session['userinfo'] = userSerializer(newUser).data
                return Response(userSerializer(newUser).data, status = status.HTTP_200_OK)
            else:
                return Response({"Error": "Serializer is not valid"}, status=status.HTTP_400_BAD_REQUEST)
      
class SignIn(APIView):
    serializer_class = AuthenticateUser
    def post(self, request, format = None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        queryset = User.objects.filter(email = request.data['email'], password = request.data['password'])
        
        if queryset.exists():
            self.request.session['userinfo'] = userSerializer(queryset[0]).data
            return Response( self.request.session['userinfo'], status=status.HTTP_200_OK)
        else:
            return Response({"Error": "Email not found or password incorrect"}, status=status.HTTP_400_BAD_REQUEST)

class CurrentUser(APIView):
    def get(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            return Response({"Error": "No one is logged in"}, status=status.HTTP_200_OK)
        else:
            userinfo = self.request.session.get('userinfo')
            if userinfo is not None:
                return Response(userinfo, status=status.HTTP_200_OK)
            else:
                return Response({"Error": "Userinfo not found in session"}, status=status.HTTP_200_OK)

class LogOut(APIView):
    def get(self, request, format=None):
        if self.request.session.exists(self.request.session.session_key):
            self.request.session.delete()
            return Response({"success": "User has been logged out"}, status=status.HTTP_200_OK)
        else:
            return Response({"Error": "No one is logged in"}, status=status.HTTP_200_OK)

def main(request):
    return HttpResponse("Back End")


    
