from rest_framework import viewsets
from .serializer import facturaSerializer
from .models import Factura

class FacturaView(viewsets.ModelViewSet):
    serializer_class = facturaSerializer
    queryset = Factura.objects.all()