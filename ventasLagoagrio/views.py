from rest_framework import viewsets
from .serializer import ventasLagoagrioSerializer
from .models import VentasLagoagrio

class ventasLagoagrioView(viewsets.ModelViewSet):
    serializer_class = ventasLagoagrioSerializer
    queryset = VentasLagoagrio.objects.all()