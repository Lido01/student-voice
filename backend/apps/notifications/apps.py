from django.apps import AppConfig


class NotificationsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.notifications'

    # ✅ SAFE enhancement (UI/label only, no system impact)
    verbose_name = "Notifications"