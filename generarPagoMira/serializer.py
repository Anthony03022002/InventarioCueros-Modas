from rest_framework import serializers
from .models import generarPagoMira

class generarPagoMiraSerializer(serializers.ModelSerializer):
    class Meta:
        model = generarPagoMira
        fields = '__all__'