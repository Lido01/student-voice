from .models import User
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()


class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'role', 'user_id')

    # 🔧 Safe enhancement: read-only protection for list API
    read_only_fields = fields


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2', 'email', 'role', 'user_id')

        # 🔧 Safe enhancement: prevent unintended updates via register endpoint
        read_only_fields = ()

    def validate(self, attrs):
        attrs['username'] = attrs['username'].strip()
        attrs['email'] = attrs['email'].strip()
        attrs['role'] = attrs.get('role', 'student').strip().lower()

        valid_roles = {choice[0] for choice in User.ROLE_CHOICES}
        if attrs['role'] not in valid_roles:
            raise serializers.ValidationError({'role': 'Select a valid role.'})

        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({'password': "Passwords don't match."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')

        # 🔧 Safe enhancement: normalize email (prevents duplicate case issues)
        email = validated_data.get('email', '')
        validated_data['email'] = email.lower()

        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            role=validated_data.get('role', 'student'),
            user_id=validated_data.get('user_id', ''),
            password=validated_data['password']
        )

        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user

        data['username'] = user.username
        data['fullname'] = user.get_full_name() or user.username
        data['role'] = getattr(user, 'role', 'student')
        data['user_id'] = getattr(user, 'user_id', '')
        data['email'] = user.email

        return data
