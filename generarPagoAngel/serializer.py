from rest_framework import serializers
from .models import generarPagoAngel

class generarPagoAngelSerializer(serializers.ModelSerializer):
    class Meta:
        model = generarPagoAngel
        fields = '__all__'