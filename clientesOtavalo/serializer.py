from rest_framework import serializers
from .models import ClientesOtavalo

class clientesOtavaloSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientesOtavalo
        fields = '__all__'