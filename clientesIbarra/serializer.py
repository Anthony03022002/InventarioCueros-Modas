from rest_framework import serializers
from .models import ClientesIbarra

class clientesIbarraSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientesIbarra
        fields = '__all__'