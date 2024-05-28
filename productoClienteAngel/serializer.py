from rest_framework import serializers
from .models import ProductoClienteAngel
from clientesAngel.serializer import clientesAngelSerializer
from inventario.serializer import inventarioSerializer

class ProductoClienteAngelSerializer(serializers.ModelSerializer):

    class Meta:
        
        model = ProductoClienteAngel
        fields = '__all__'