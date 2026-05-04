from django.contrib import admin
from .models import Feedback

@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    list_display = ('id', 'student', 'subject', 'category', 'target', 'status', 'created_at')
    list_filter = ('category', 'status', 'created_at')
    search_fields = ('subject', 'description', 'student__username')

    # ✅ SAFE ENHANCEMENTS (no logic change)
    ordering = ('-created_at',)
    list_per_page = 25
    readonly_fields = ('created_at',)