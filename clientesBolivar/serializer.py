from rest_framework import serializers
from .models import ClientesBolivar

class clientesBolivarSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientesBolivar
        fields = '__all__'