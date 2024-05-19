from rest_framework import serializers
from .models import generarPagoOtavalo

class generarPagoOtavaloSerializer(serializers.ModelSerializer):
    class Meta:
        model = generarPagoOtavalo
        fields = '__all__'