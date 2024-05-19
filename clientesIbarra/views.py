from rest_framework import viewsets
from .serializer import clientesIbarraSerializer
from .models import ClientesIbarra

class ClientesIbarraView(viewsets.ModelViewSet):
    serializer_class = clientesIbarraSerializer
    queryset = ClientesIbarra.objects.all()