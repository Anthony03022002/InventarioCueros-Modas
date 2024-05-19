from rest_framework import serializers
from .models import generarPagoCayambe

class generarPagoCayambeSerializer(serializers.ModelSerializer):
    class Meta:
        model = generarPagoCayambe
        fields = '__all__'