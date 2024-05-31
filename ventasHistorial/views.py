from rest_framework import viewsets
from .serializer import ventasHistorialSerializer
from .models import VentasHistorial

class ventasHistorialView(viewsets.ModelViewSet):
    serializer_class = ventasHistorialSerializer
    queryset = VentasHistorial.objects.all()