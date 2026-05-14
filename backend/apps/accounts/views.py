"""Account API views for authentication-related and user-management requests."""
# DRF generic views provide pre-built CRUD patterns (ListAPIView, CreateAPIView, etc.)
# status contains HTTP status code constants (e.g. status.HTTP_201_CREATED)
# permissions is the base module for writing custom permission classes
from rest_framework import generics, status, permissions
from rest_framework.response import Response

# get_user_model() returns whatever model is set as AUTH_USER_MODEL in settings.py,
# keeping this file decoupled from the concrete User import
from django.contrib.auth import get_user_model

from .serializers import (
    RegisterSerializer,               # Handles new account creation + validation
    UserListSerializer,               # Read-only serializer for listing users
    CustomTokenObtainPairSerializer,  # Extends JWT login response with extra user fields
)

# TokenObtainPairView is SimpleJWT's built-in login view; we subclass it below
# to swap in our custom serializer
from rest_framework_simplejwt.views import TokenObtainPairView

# Resolve the active User model (honours AUTH_USER_MODEL in settings.py)
User = get_user_model()


# 🔧 Safe RBAC permission (unchanged behavior, just documented better)
class IsAdminOrDepartmentOrAffair(permissions.BasePermission):
    """
    Custom DRF permission that restricts access to users whose role is one of:
    'admin', 'department', or 'student_affairs'.

    has_permission() is called on every incoming request before the view runs.
    Both conditions must be true:
      1. The user is authenticated (rules out anonymous requests)
      2. The user's role attribute is in the allowed set

    getattr(..., None) is used defensively so the check never raises an
    AttributeError if a custom User model omits the 'role' field.
    """
    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and
            getattr(request.user, 'role', None) in ['admin', 'department', 'student_affairs']
        )


class UserListView(generics.ListAPIView):
    """
    Read-only endpoint that returns a paginated list of users.
    Only accessible to admins, department staff, and student affairs staff
    (enforced by IsAdminOrDepartmentOrAffair above).

    Supports optional ?role= query parameter for filtering by role.
    """

    # Default queryset — all users, alphabetically ordered
    queryset = User.objects.all().order_by('username')
    serializer_class  = UserListSerializer
    permission_classes = [IsAdminOrDepartmentOrAffair]

    def get_queryset(self):
        """
        Override the default queryset to support optional role-based filtering.
        If the ?role= query parameter is present and non-empty, the results are
        narrowed to users with that exact role value.
        """
        queryset = super().get_queryset()
        # Read the optional 'role' filter from the request's query string
        role = self.request.query_params.get('role')

        # 🔧 Safe improvement: defensive filtering (no logic change)
        # The truthiness check (`if role`) ensures we only call .filter() when
        # a non-empty value is provided, avoiding an unintended empty-string match
        if role:
            queryset = queryset.filter(role=role)

        return queryset


from django.shortcuts import render  # (kept unchanged)


# Create your views here.
# Note: the imports below are intentional duplicates retained from the original file
# structure; they do not affect runtime behaviour because Python caches modules.
from rest_framework import generics, status
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .serializers import RegisterSerializer

User = get_user_model()


class RegisterView(generics.CreateAPIView):
    """
    Public endpoint for creating a new user account.
    No authentication is required — unauthenticated visitors must be able to register.

    On success (HTTP 201), the response includes the serialized user data plus
    freshly minted 'refresh' and 'access' JWT tokens so the client can log in
    immediately without a separate call to the token endpoint.
    """

    queryset          = User.objects.all()
    serializer_class  = RegisterSerializer

    def create(self, request, *args, **kwargs):
        """
        Override CreateAPIView.create() to append JWT tokens to the standard
        201 response, saving the client a round-trip to the login endpoint.
        """

        # Deserialize and validate the incoming request payload.
        # raise_exception=True returns a 400 response automatically on validation failure,
        # so no manual error handling is needed here.
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Persist the new user; calls RegisterSerializer.create() under the hood
        user = serializer.save()

        # 🔧 Safe improvement: isolated import (already exists but kept safe)
        # Importing RefreshToken here rather than at the top of the file avoids a
        # circular import risk and keeps the dependency contained to this method
        from rest_framework_simplejwt.tokens import RefreshToken

        # Generate a refresh/access token pair for the newly created user
        refresh = RefreshToken.for_user(user)

        # Start with the serialized user data (id, username, email, role, user_id)
        data = serializer.data

        # 🔧 Safe enhancement: ensure response consistency
        # Attach the string representations of both tokens so the client can
        # store them and begin making authenticated requests immediately
        data['refresh'] = str(refresh)
        data['access']  = str(refresh.access_token)

        # get_success_headers() returns the Location header pointing to the new resource
        headers = self.get_success_headers(serializer.data)

        # HTTP 201 Created — signals that a new resource was successfully persisted
        return Response(data, status=status.HTTP_201_CREATED, headers=headers)


class CustomTokenObtainPairView(TokenObtainPairView):
    """
    Login endpoint that replaces SimpleJWT's default TokenObtainPairView.
    The only change is swapping in CustomTokenObtainPairSerializer, which
    appends user profile fields (username, fullname, role, user_id, email)
    to the standard access/refresh token response body.
    """

    # Swap the default serializer for our custom one — no other behaviour changes
    serializer_class = CustomTokenObtainPairSerializer