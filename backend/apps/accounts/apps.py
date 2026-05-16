from django.apps import AppConfig


class AccountsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.accounts'

    # 🔧 Safe enhancement: app metadata (no behavior change)
    verbose_name = "Accounts Management"
    
    def ready(self):
        try:
            import apps.accounts.signals
        except ModuleNotFoundError:
            pass
