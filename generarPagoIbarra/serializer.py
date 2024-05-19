from rest_framework import serializers
from .models import generarPagoIbarra

class generarPagoIbarraSerializer(serializers.ModelSerializer):
    class Meta:
        model = generarPagoIbarra
        fields = '__all__'