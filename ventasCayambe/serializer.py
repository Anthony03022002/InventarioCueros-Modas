from rest_framework import serializers
from .models import VentasCayambe

class ventasCayambeSerializer(serializers.ModelSerializer):
    class Meta:
        model = VentasCayambe
        fields = '__all__'