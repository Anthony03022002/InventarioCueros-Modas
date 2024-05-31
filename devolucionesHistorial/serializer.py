from rest_framework import serializers
from .models import DevolucionesHistorial

class devolucionHistorialSerializer(serializers.ModelSerializer):
    class Meta:
        model = DevolucionesHistorial
        fields = '__all__'