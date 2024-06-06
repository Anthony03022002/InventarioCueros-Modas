from rest_framework import serializers
from .models import VentasBolivar

class ventasBolivarSerializer(serializers.ModelSerializer):
    class Meta:
        model = VentasBolivar
        fields = '__all__'