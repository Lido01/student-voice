from django.apps import AppConfig


class DepartmentsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.departments'

    # 🔧 Safe enhancement: improves Django admin readability
    verbose_name = "Departments Management"
    def ready(self):
        try:
            import apps.departments.signals
        except Exception:
            pass
