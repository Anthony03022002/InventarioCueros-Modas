from rest_framework import viewsets
from .serializer import clientesAtuntaquiSerializer
from .models import ClientesAtuntaqui

class ClientesAtuntaquiView(viewsets.ModelViewSet):
    serializer_class = clientesAtuntaquiSerializer
    queryset = ClientesAtuntaqui.objects.all()