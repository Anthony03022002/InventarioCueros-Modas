from rest_framework import serializers
from .models import VentasOtavalo

class ventasOtavaloSerializer(serializers.ModelSerializer):
    class Meta:
        model = VentasOtavalo
        fields = '__all__'