from rest_framework import serializers
from .models import VentasLagoagrio

class ventasLagoagrioSerializer(serializers.ModelSerializer):
    class Meta:
        model = VentasLagoagrio
        fields = '__all__'