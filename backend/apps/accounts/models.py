from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('department', 'Department'),
        ('student_affairs', 'Student Affairs'),
        ('student', 'Student'),
    )

    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    user_id = models.CharField(max_length=50, unique=True)

    # 🔧 Safe enhancements (no schema or logic change)

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"
        ordering = ['username']

    def __str__(self):
        return f"{self.username} ({self.role})"

    # Optional helper (does not affect DB or auth)
    def is_admin_role(self):
        return self.role == 'admin'