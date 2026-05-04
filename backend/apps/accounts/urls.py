from django.urls import path
from .views import RegisterView, UserListView, CustomTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
	path('register/', RegisterView.as_view(), name='register'),
	path('login/', CustomTokenObtainPairView.as_view(), name='login'),
	path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

 	path('users/', UserListView.as_view(), name='user-list'),

    # 🔧 Safe enhancement: future API extension placeholders (no effect now)
    # path('me/', CurrentUserView.as_view(), name='current-user'),
    # path('logout/', LogoutView.as_view(), name='logout'),
]

# 🔧 Safe enhancement: API grouping hint (no runtime effect)
app_name = 'accounts'
