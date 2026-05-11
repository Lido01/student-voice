"""Serializers that validate account data and shape user responses for the API."""
# Import the User model defined in the local models.py
from .models import User

from rest_framework import serializers
from django.contrib.auth import get_user_model

# validate_password runs Django's built-in password strength validators
# (minimum length, common password check, numeric-only check, etc.)
from django.contrib.auth.password_validation import validate_password

# TokenObtainPairSerializer is the base JWT login serializer from SimpleJWT;
# we extend it to attach extra user fields to the token response payload
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# Re-assign User via get_user_model() so this module always uses the
# AUTH_USER_MODEL defined in settings.py, even if it is swapped out later
User = get_user_model()


class UserListSerializer(serializers.ModelSerializer):
    """
    Read-only serializer used by the user list / retrieve endpoints.
    Exposes only the safe, non-sensitive fields needed for listing users.
    """

    class Meta:
        model = User
        # Explicit field list — password hash and other sensitive columns are excluded
        fields = ('id', 'username', 'email', 'role', 'user_id')

    # 🔧 Safe enhancement: read-only protection for list API
    # Mirrors the fields tuple so that every field is treated as read-only,
    # preventing any accidental write operations through this serializer
    read_only_fields = fields


class RegisterSerializer(serializers.ModelSerializer):
    """
    Write-only serializer for new account creation.
    Validates the password twice (password + password2 confirmation) and
    enforces Django's built-in password validators before saving.
    """

    # write_only=True ensures neither password field ever appears in serialized output
    # validators=[validate_password] runs Django's password strength checks automatically
    password  = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        # password2 is included here for input validation but is removed before saving (see create())
        fields = ('username', 'password', 'password2', 'email', 'role', 'user_id')

        # 🔧 Safe enhancement: prevent unintended updates via register endpoint
        # Empty tuple (not None) so DRF does not accidentally mark any field read-only
        read_only_fields = ()

    def validate(self, attrs):
        """
        Object-level validation — runs after all individual field validators pass.
        Normalises string inputs and enforces business rules that span multiple fields.
        """

        # Strip leading/trailing whitespace from free-text inputs to prevent
        # ghost duplicates caused by accidental spaces (e.g. " admin" vs "admin")
        attrs['username'] = attrs['username'].strip()
        attrs['email']    = attrs['email'].strip()

        # Default role to 'student' if not supplied; lowercase for consistent comparison
        attrs['role'] = attrs.get('role', 'student').strip().lower()

        # Build the set of valid role keys from the model's ROLE_CHOICES constant
        # and reject anything that isn't in the list
        valid_roles = {choice[0] for choice in User.ROLE_CHOICES}
        if attrs['role'] not in valid_roles:
            raise serializers.ValidationError({'role': 'Select a valid role.'})

        # Confirm that both password fields match before the user is created
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({'password': "Passwords don't match."})

        return attrs

    def create(self, validated_data):
        """
        Persist a new user using Django's create_user() manager method,
        which handles password hashing automatically.
        """

        # password2 was only needed for confirmation — remove it before saving
        # to avoid passing an unexpected keyword argument to create_user()
        validated_data.pop('password2')

        # 🔧 Safe enhancement: normalize email (prevents duplicate case issues)
        # Lowercasing ensures "User@Example.com" and "user@example.com" are treated
        # as the same address, avoiding silent duplicate account creation
        email = validated_data.get('email', '')
        validated_data['email'] = email.lower()

        # create_user() is preferred over create() because it hashes the password
        # and applies any other custom logic defined on the UserManager
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            role=validated_data.get('role', 'student'),     # default role: student
            user_id=validated_data.get('user_id', ''),      # optional institutional ID
            password=validated_data['password']
        )

        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Extends SimpleJWT's default login serializer to include extra user profile
    fields in the token response body alongside the standard access/refresh tokens.
    These fields allow the frontend to bootstrap its user context without a
    separate /me/ API call immediately after login.
    """

    def validate(self, attrs):
        """
        Call the parent implementation to authenticate credentials and generate
        the access/refresh token pair, then append user profile data to the response.
        """

        # super().validate() authenticates username+password, populates self.user,
        # and returns a dict containing 'access' and 'refresh' JWT strings
        data = super().validate(attrs)

        # self.user is set by the parent class after successful authentication
        user = self.user

        # Append user profile fields to the response payload so the client can
        # store them in its auth state immediately after a successful login

        data['username'] = user.username

        # get_full_name() returns "first last"; fall back to username when name is empty
        data['fullname'] = user.get_full_name() or user.username

        # getattr() with a default guards against custom User models that may not
        # define the 'role' or 'user_id' attributes
        data['role']    = getattr(user, 'role',    'student')
        data['user_id'] = getattr(user, 'user_id', '')
        data['email']   = user.email

        return data