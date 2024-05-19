from rest_framework import serializers
from .models import Devoluciones

class devolucionesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Devoluciones
        fields = '__all__'