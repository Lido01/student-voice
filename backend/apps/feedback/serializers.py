from rest_framework import serializers
from .models import Feedback

class FeedbackSerializer(serializers.ModelSerializer):
    student = serializers.PrimaryKeyRelatedField(read_only=True, required=False)

    class Meta:
        model = Feedback
        fields = '__all__'

        # ✅ SAFE ENHANCEMENTS (no API change)
        read_only_fields = ('created_at', 'status')
        extra_kwargs = {
            'image': {'required': False, 'allow_null': True},
        }

    def validate(self, data):
        # If anonymous is True, student is not required
        anonymous = data.get('anonymous', False)

        if anonymous:
            data['student'] = None

        return data