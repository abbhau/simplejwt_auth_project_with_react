from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .serializers import UserSerializer,UserLoginSerializer,UserProfileSeializer,ChangeUserSerializer,SendPassResetEmailSerializer,UserPassResetSerializer
from django.contrib.auth import authenticate
from app1.api.renderers import UserRenderer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


class UserRegistrationView(APIView):
    renderer_classes =[UserRenderer]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            print(user)
            token = get_tokens_for_user(user)
            print(token)
            return Response({'token': token,'msg':'registration successful'},status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


class UserLoginview(APIView):
    renderer_classes = [UserRenderer]

    def post(self,request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email=serializer.data.get('email')
            password = serializer.data.get('password')
            user = authenticate(email=email,password=password)
            print(user)
            if user is not None:
                token = get_tokens_for_user(user)
                return Response({'token':token,'msg':"login success"},status=status.HTTP_201_CREATED)
            else:
                return Response({'errors':{'non_field_errors':['email or password is not valid']}}
                                ,status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]
    def get(self,request,format=None):
        serializer = UserProfileSeializer(request.user)
        return Response(serializer.data,status=status.HTTP_200_OK)
    

class UserChangePassView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]
    def post(self,request, format=None):
        serializer = ChangeUserSerializer(data=request.data,
        context={'user':request.user})
        
        if serializer.is_valid(raise_exception=True):
            return Response({'msg': "password change successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SendResetPasswordEmail(APIView):
    renderer_classes = [UserRenderer]
    def post(self,request,format=None):
        serializer = SendPassResetEmailSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            return Response({'msg':'password reset link sent plz check your email'})


class UserPassResetView(APIView):
    renderer_classes = [UserRenderer]
    def post(self,request,uid,token,format=None):
        serializer = UserPassResetSerializer(data=request.data,context={'uid':uid,"token":token})
        if serializer.is_valid(raise_exception=True):
            return Response({"msg":"password reset successfully"},status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
     permission_classes = (IsAuthenticated,)
     
     def post(self, request):
          try:
               refresh_token = request.data["refresh_token"]
               token = RefreshToken(refresh_token)
               token.blacklist()
               return Response(status=status.HTTP_205_RESET_CONTENT)
          except Exception as e:
               return Response(status=status.HTTP_400_BAD_REQUEST)