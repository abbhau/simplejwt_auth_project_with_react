from rest_framework import serializers
from app1.models import User
from django.utils.encoding import smart_str, force_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import send_mail
from django.conf import settings

class UserSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}
                                      ,write_only=True)

    class Meta:
        model = User
        fields = ['email', 'name', 'tc', 'password', 'password2']
        extra_kwargs = {'password': {"write_only": True}}

    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        if password != password2:
            raise serializers.ValidationError('password & password 2 must be same')
        return attrs

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=250)

    class Meta:
        model = User
        fields = ['email', 'password']


class UserProfileSeializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'name']


class ChangeUserSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=255, style=
    {'input_type': 'password'}, write_only=True)
    password2 = serializers.CharField(max_length=255, style=
    {'input_type': 'password'}, write_only=True)

    class Meta:
        fields = ['password', 'password2']

    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        user = self.context.get('user')
        if password != password2:
            raise serializers.ValidationError('password & password 2 must be same')
        user.set_password(password)
        user.save()
        return attrs


class SendPassResetEmailSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255)

    class Meta:
        fields = ['email']

    def validate(self, attrs):
        email = attrs.get('email')
        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            uid = urlsafe_base64_encode(force_bytes(user.id))
            print(uid)
            token = PasswordResetTokenGenerator().make_token(user)
            print(token)
            link = 'http://localhost:3000/api/user/reset/' + uid + '/' + token
            print(link)
            send_mail(
            subject='password reset link .....',
            from_email=settings.EMAIL_HOST_USER,
            message='This is the test welcome message for you....!',
            recipient_list=[user.email],
            html_message=f"""
			        <html><body>
                    <h3>Your Credentials for Login is....()</h3><br>
                    <a href="{link}">Please click here to Reset your Password !</a></body></html>
			        """
        )
            return attrs
        else:
            raise serializers.ValidationError('Email dos not exist')


class UserPassResetSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=255, style=
    {'input_type': 'password'}, write_only=True)
    password2 = serializers.CharField(max_length=255, style=
    {'input_type': 'password'}, write_only=True)

    class Meta:
        fields = ['password', 'password2']

    def validate(self, attrs):
        try:
            password = attrs.get('password')
            password2 = attrs.get('password2')
            uid = self.context.get('uid')
            token = self.context.get('token')
            if password != password2:
                raise serializers.ValidationError('password & password 2 must be same')
            id = smart_str(urlsafe_base64_decode(uid))
            user = User.objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise serializers.ValidationError('token is not valid or expired')
            user.set_password(password)
            user.save()
            return attrs
        except DjangoUnicodeDecodeError as identifier:
            PasswordResetTokenGenerator().check_token(user, token)
            raise serializers.ValidationError('token is not valid or expired')
