from rest_framework import serializers
from .models import ClientesPimampiro

class clientesPimampiroSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientesPimampiro
        fields = '__all__'