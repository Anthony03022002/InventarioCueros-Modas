from rest_framework import serializers
from .models import VentasPimampiro

class ventasPimampiroSerializer(serializers.ModelSerializer):
    class Meta:
        model = VentasPimampiro
        fields = '__all__'