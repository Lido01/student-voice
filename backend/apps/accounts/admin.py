from django.contrib import admin
from .models import User

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'role', 'user_id')

    # 🔧 Added enhancements (no logic changed)
    search_fields = ('username', 'email', 'user_id')
    list_filter = ('role',)
    ordering = ('username',)
    list_per_page = 25
    readonly_fields = ('user_id',)