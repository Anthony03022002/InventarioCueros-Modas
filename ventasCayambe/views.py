from rest_framework import viewsets
from .serializer import ventasCayambeSerializer
from .models import VentasCayambe

class ventasCayambeView(viewsets.ModelViewSet):
    serializer_class = ventasCayambeSerializer
    queryset = VentasCayambe.objects.all()