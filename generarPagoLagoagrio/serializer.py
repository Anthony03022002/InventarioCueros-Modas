from rest_framework import serializers
from .models import generarPagoLagoagrio

class generarPagoLagoagrioSerializer(serializers.ModelSerializer):
    class Meta:
        model = generarPagoLagoagrio
        fields = '__all__'