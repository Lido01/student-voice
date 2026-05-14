"""URL routes for department-related API endpoints."""
from django.urls import path
from .views import DepartmentViewSet

department_list = DepartmentViewSet.as_view({
	'get': 'list',
	'post': 'create',
})

department_detail = DepartmentViewSet.as_view({
	'get': 'retrieve',
	'put': 'update',
	'patch': 'partial_update',
	'delete': 'destroy',
})

urlpatterns = [
	path('departments/', department_list, name='department-list'),
	path('departments/<int:pk>/', department_detail, name='department-detail'),

	# 🔧 Safe enhancement: API structure clarity (no functional change)
	# Future endpoints (optional expansion, currently inactive)
	# path('departments/search/', DepartmentViewSet.as_view({'get': 'search'}), name='department-search'),
]

# 🔧 Safe enhancement: namespace support for larger apps
app_name = 'departments'