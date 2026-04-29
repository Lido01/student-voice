from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Feedback
from .serializers import FeedbackSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class IsAdminOrDepartmentOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow admins, department, or student_affairs to edit/delete, others read-only.
    Students can only view and create their own feedback.
    """
    def has_permission(self, request, view):
        if request.user.is_authenticated:
            if request.user.role in ['admin', 'department', 'student_affairs']:
                return True
            if view.action in ['list', 'retrieve', 'create']:
                return True
        return False

    def has_object_permission(self, request, view, obj):
        if request.user.is_authenticated:
            if request.user.role in ['admin', 'department', 'student_affairs']:
                return True
            if view.action in ['retrieve', 'update', 'partial_update', 'destroy']:
                return obj.student == request.user
            if view.action == 'create':
                return True
        return False


class FeedbackViewSet(viewsets.ModelViewSet):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    # permission_classes = [IsAdminOrDepartmentOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated:
            return Feedback.objects.none()
        if user.role in ['admin', 'department', 'student_affairs']:
            return Feedback.objects.all()
        # Students only see their own feedback
        return Feedback.objects.filter(student=user)

    def perform_create(self, serializer):
        # If anonymous, student=None, else set student from request.user
        anonymous = self.request.data.get('anonymous', False)
        if isinstance(anonymous, str):
            anonymous = anonymous.lower() == 'true'
        if anonymous:
            serializer.save(student=None, anonymous=True)
        else:
            serializer.save(student=self.request.user, anonymous=False)

    @action(detail=False, methods=['get'], url_path='categories')
    def categories(self, request):
        # Return the valid category choices from the model
        from .models import Feedback
        choices = []
        field = Feedback._meta.get_field('category')
        if hasattr(field, 'choices'):
            choices = [c[0] for c in field.choices]
        return Response(choices)

    def create(self, request, *args, **kwargs):
        """Create feedback (login required)."""
        return super().create(request, *args, **kwargs)

    def list(self, request, *args, **kwargs):
        """List feedbacks (role-based)."""
        return super().list(request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        """Get feedback details (role-based)."""
        return super().retrieve(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        """Update feedback (role-based)."""
        # Only admin/department/affairs can update status
        user = request.user
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        data = request.data.copy()
        if 'status' in data:
            if user.role not in ['admin', 'department', 'student_affairs']:
                return Response({'detail': 'You do not have permission to change status.'}, status=status.HTTP_403_FORBIDDEN)
        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def partial_update(self, request, *args, **kwargs):
        """Partial update feedback (role-based)."""
        return super().partial_update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        """Delete feedback (role-based)."""
        return super().destroy(request, *args, **kwargs)
    