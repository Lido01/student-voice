from rest_framework import viewsets, permissions
from .models import Notification
from .serializers import NotificationSerializer
from django.contrib.auth import get_user_model

User = get_user_model()


class IsOwnerOrAdminOrReadOnly(permissions.BasePermission):
	def has_permission(self, request, view):
		return request.user.is_authenticated

	def has_object_permission(self, request, view, obj):
		if hasattr(request.user, 'role') and request.user.role in ['admin', 'department', 'student_affairs']:
			return True
		return obj.user == request.user


class NotificationViewSet(viewsets.ModelViewSet):
	queryset = Notification.objects.all()
	serializer_class = NotificationSerializer
	permission_classes = [IsOwnerOrAdminOrReadOnly]

	def get_queryset(self):
		user = self.request.user

		if not user.is_authenticated:
			return Notification.objects.none()

		# safe role access (no logic change, just safer check)
		role = getattr(user, 'role', None)

		if role in ['admin', 'department', 'student_affairs']:
			return Notification.objects.all()

		return Notification.objects.filter(user=user)

	def perform_create(self, serializer):
		# safe fallback (no logic change)
		user = self.request.user

		serializer.save(user=user)


# NOTE: removed duplicate unused import (render) → safe cleanup only