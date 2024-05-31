from rest_framework import serializers
from .models import VentasHistorial

class ventasHistorialSerializer(serializers.ModelSerializer):
    class Meta:
        model = VentasHistorial
        fields = '__all__'