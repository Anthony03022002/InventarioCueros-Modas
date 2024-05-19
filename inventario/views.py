from rest_framework import viewsets
from .serializer import inventarioSerializer
from .models import Inventario

class InventarioView(viewsets.ModelViewSet):
    serializer_class = inventarioSerializer
    queryset = Inventario.objects.all()