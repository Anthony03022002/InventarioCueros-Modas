from rest_framework import serializers
from .models import generarPagoAtuntaqui

class generarPagoAtuntaquiSerializer(serializers.ModelSerializer):
    class Meta:
        model = generarPagoAtuntaqui
        fields = '__all__'