from django.contrib import admin
from .models import Notification


@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ["user", "message"]

    # ✅ SAFE enhancements (no logic or DB impact)
    list_filter = ["user"]
    search_fields = ["message", "user__username"]
    ordering = ["-id"]
    list_per_page = 25