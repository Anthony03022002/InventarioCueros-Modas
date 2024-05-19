from rest_framework import serializers
from .models import ClientesLagoagrio

class clientesLagoagrioSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientesLagoagrio
        fields = '__all__'