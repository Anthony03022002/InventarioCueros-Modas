from rest_framework import serializers
from .models import ClientesAtuntaqui

class clientesAtuntaquiSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientesAtuntaqui
        fields = '__all__'