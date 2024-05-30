from rest_framework import serializers
from .models import StockHistoria

class stockHistoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockHistoria
        fields = '__all__'