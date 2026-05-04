from rest_framework import generics, status, permissions
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .serializers import (
    RegisterSerializer,
    UserListSerializer,
    CustomTokenObtainPairSerializer,
)
from rest_framework_simplejwt.views import TokenObtainPairView

User = get_user_model()


# 🔧 Safe RBAC permission (unchanged behavior, just documented better)
class IsAdminOrDepartmentOrAffair(permissions.BasePermission):
	def has_permission(self, request, view):
		return request.user.is_authenticated and getattr(
			request.user, 'role', None
		) in ['admin', 'department', 'student_affairs']


class UserListView(generics.ListAPIView):
	queryset = User.objects.all()
	serializer_class = UserListSerializer
	permission_classes = [IsAdminOrDepartmentOrAffair]

	def get_queryset(self):
		queryset = super().get_queryset()
		role = self.request.query_params.get('role')

		# 🔧 Safe improvement: defensive filtering (no logic change)
		if role:
			queryset = queryset.filter(role=role)

		return queryset


from django.shortcuts import render  # (kept unchanged)


# Create your views here.
from rest_framework import generics, status
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .serializers import RegisterSerializer

User = get_user_model()


class RegisterView(generics.CreateAPIView):
	queryset = User.objects.all()
	serializer_class = RegisterSerializer

	def create(self, request, *args, **kwargs):
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		user = serializer.save()

		# 🔧 Safe improvement: isolated import (already exists but kept safe)
		from rest_framework_simplejwt.tokens import RefreshToken

		refresh = RefreshToken.for_user(user)
		data = serializer.data

		# 🔧 Safe enhancement: ensure response consistency
		data['refresh'] = str(refresh)
		data['access'] = str(refresh.access_token)

		headers = self.get_success_headers(serializer.data)

		return Response(data, status=status.HTTP_201_CREATED, headers=headers)


class CustomTokenObtainPairView(TokenObtainPairView):
	serializer_class = CustomTokenObtainPairSerializer
