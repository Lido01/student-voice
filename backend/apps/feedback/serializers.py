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
        target = data.get('target')

        if anonymous:
            data['student'] = None

        if isinstance(target, str):
            data['target'] = target.strip().lower()

        for field in ('subject', 'description'):
            if field in data and isinstance(data[field], str):
                data[field] = data[field].strip()

        return data

FeedbackSerializer.__name__ = 'FeedbackSerializer'
