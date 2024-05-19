from rest_framework import serializers
from .models import ClientesMira

class clientesMiraSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientesMira
        fields = '__all__'