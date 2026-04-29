
from rest_framework import serializers
from .models import Feedback

class FeedbackSerializer(serializers.ModelSerializer):
    student = serializers.PrimaryKeyRelatedField(read_only=True, required=False)

    class Meta:
        model = Feedback
        fields = '__all__'

    def validate(self, data):
        # If anonymous is True, student is not required
        anonymous = data.get('anonymous', False)
        if anonymous:
            data['student'] = None
        # else: student will be set in view
        return data