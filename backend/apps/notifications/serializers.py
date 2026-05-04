from rest_framework import serializers
from .models import Notification


class NotificationSerializer(serializers.ModelSerializer):
	class Meta:
		model = Notification
		fields = '__all__'

		# ✅ SAFE enhancements (no API change)
		read_only_fields = ('created_at',)
		extra_kwargs = {
			'is_read': {'required': False},
		}

NotificationSerializer.__name__ = 'NotificationSerializer'
