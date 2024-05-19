from rest_framework import viewsets
from .serializer import clientesCayambeSerializer
from .models import ClientesCayambe

class ClientesCayambeView(viewsets.ModelViewSet):
    serializer_class = clientesCayambeSerializer
    queryset = ClientesCayambe.objects.all()