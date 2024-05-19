from rest_framework import serializers
from .models import Factura

class facturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Factura
        fields = '__all__'