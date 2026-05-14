"""Account models that define project users and their role-based access details."""
# AbstractUser provides the full default Django user implementation
# (username, email, password, first_name, last_name, is_staff, is_active, etc.)
# Subclassing it lets us add custom fields while keeping all built-in auth behaviour
from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """
    Custom user model for the ASTU SFES system.
    Extends Django's AbstractUser to add a role-based access field and an
    institutional user_id alongside the standard authentication fields.

    Must be referenced as AUTH_USER_MODEL in settings.py so Django and
    third-party packages (e.g. SimpleJWT) resolve it correctly everywhere.
    """

    # Tuple of (db_value, human_readable_label) pairs used by the role field.
    # Defining it at class level makes it importable by serializers and views
    # without having to instantiate the model (e.g. User.ROLE_CHOICES).
    ROLE_CHOICES = (
        ('admin',           'Admin'),
        ('department',      'Department'),
        ('student_affairs', 'Student Affairs'),
        ('student',         'Student'),
    )

    # Stores the user's system role — controls which views and data they can access.
    # max_length=20 comfortably fits the longest current choice ('student_affairs' = 15 chars).
    # choices= enforces the allowed values at the form/serializer validation layer;
    # database-level enforcement requires a separate migration constraint if needed.
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)

    # Institutional identifier (e.g. student registration number or staff ID).
    # unique=True prevents two accounts from sharing the same institutional ID.
    # Stored as CharField rather than IntegerField to accommodate alphanumeric codes.
    user_id = models.CharField(max_length=50, unique=True)

    class Meta:
        # Human-readable names shown in the Django admin interface
        verbose_name        = "User"
        verbose_name_plural = "Users"
        # Default queryset ordering — alphabetical by username for consistent list views
        ordering = ['username']

    def __str__(self):
        """
        String representation used in the Django admin, shell, and anywhere
        the model instance is cast to a string.
        Example output: "amanuel (student)"
        """
        return f"{self.username} ({self.role})"

    def is_admin_role(self):
        """
        Convenience helper to check whether this user holds the 'admin' role.
        Prefer this over direct string comparison (user.role == 'admin') in
        views and templates to keep role logic in one place and easy to update.

        Note: this is distinct from Django's built-in is_staff / is_superuser flags,
        which control access to the Django admin site independently of application roles.

        Returns:
            bool: True if the user's role is 'admin', False otherwise.
        """
        return self.role == 'admin'