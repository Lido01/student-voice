from django.apps import AppConfig


class AccountsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.accounts'

    # 🔧 Safe enhancement: app metadata (no behavior change)
    verbose_name = "Accounts Management"

    # 🔧 Safe hook placeholder (does nothing unless extended later)
    def ready(self):
        import apps.accounts.signals  # safe convention if signals exist