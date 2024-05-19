from rest_framework import serializers
from .models import Inventario

class inventarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventario
        fields = '__all__'