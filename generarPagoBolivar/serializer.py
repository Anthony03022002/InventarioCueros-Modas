from rest_framework import serializers
from .models import generarPagoBolivar

class generarPagoBolivarSerializer(serializers.ModelSerializer):
    class Meta:
        model = generarPagoBolivar
        fields = '__all__'