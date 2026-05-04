from django.apps import AppConfig


class DepartmentsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.departments'

    # 🔧 Safe enhancement: improves Django admin readability
    verbose_name = "Departments Management"

    # 🔧 Safe enhancement: placeholder hook for future signals
    def ready(self):
        try:
            import apps.departments.signals  # only loads if file exists
        except Exception:
            pass