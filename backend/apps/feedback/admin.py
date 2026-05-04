from django.contrib import admin

# Register your models here.
from .models import Feedback


@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    list_display = ('id', 'student', 'subject', 'category', 'target', 'status', 'created_at')
    list_filter = ('category', 'status', 'created_at')
    search_fields = ('subject', 'description', 'student__username')

    # 🔧 Safe enhancement: improves admin usability
    ordering = ('-created_at',)

    # 🔧 Safe enhancement: read-only audit protection
    readonly_fields = ('created_at',)

    # 🔧 Safe enhancement: better admin UI layout grouping
    fieldsets = (
        ('Main Info', {
            'fields': ('student', 'subject', 'description')
        }),
        ('Classification', {
            'fields': ('category', 'target', 'status')
        }),
        ('Metadata', {
            'fields': ('created_at',),
        }),
    )