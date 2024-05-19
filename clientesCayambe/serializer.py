from rest_framework import serializers
from .models import ClientesCayambe

class clientesCayambeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientesCayambe
        fields = '__all__'