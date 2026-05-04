from rest_framework import serializers
from .models import Department


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'

        # 🔧 Safe enhancement: prevents accidental edits to system fields in updates
        read_only_fields = ('id', 'created_at')

    # 🔧 Safe enhancement: improves API output consistency (no DB impact)
    def to_representation(self, instance):
        data = super().to_representation(instance)

        # normalize name formatting for UI consistency
        data['name'] = str(data['name']).strip()

        return data