from rest_framework import viewsets
from .serializer import clientesAngelSerializer
from .models import ClientesAngel

class ClientesAngelView(viewsets.ModelViewSet):
    serializer_class = clientesAngelSerializer
    queryset = ClientesAngel.objects.all()