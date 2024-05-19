from rest_framework import serializers
from .models import ClientesAngel

class clientesAngelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientesAngel
        fields = '__all__'