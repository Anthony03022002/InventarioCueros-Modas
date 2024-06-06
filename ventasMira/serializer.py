from rest_framework import serializers
from .models import VentasMira

class ventasMiraSerializer(serializers.ModelSerializer):
    class Meta:
        model = VentasMira
        fields = '__all__'