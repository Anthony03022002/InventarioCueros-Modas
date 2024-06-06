from rest_framework import serializers
from .models import VentasAtuntaqui

class ventasAtuntaquiSerializer(serializers.ModelSerializer):
    class Meta:
        model = VentasAtuntaqui
        fields = '__all__'