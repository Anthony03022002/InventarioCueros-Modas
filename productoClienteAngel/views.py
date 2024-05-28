from rest_framework import viewsets
from .serializer import ProductoClienteAngelSerializer
from .models import ProductoClienteAngel

class ProductoClienteAngelView(viewsets.ModelViewSet):
    serializer_class = ProductoClienteAngelSerializer
    queryset = ProductoClienteAngel.objects.all()