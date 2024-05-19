from rest_framework import serializers
from .models import generarPagoPimampiro

class generarPagoPimampiroSerializer(serializers.ModelSerializer):
    class Meta:
        model = generarPagoPimampiro
        fields = '__all__'