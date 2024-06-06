from rest_framework import serializers
from .models import VentasIbarra

class ventasIbarraSerializer(serializers.ModelSerializer):
    class Meta:
        model = VentasIbarra
        fields = '__all__'