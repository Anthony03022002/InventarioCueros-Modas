from rest_framework import viewsets
from .serializer import clientesPimampiroSerializer
from .models import ClientesPimampiro

class ClientesPimampiroView(viewsets.ModelViewSet):
    serializer_class = clientesPimampiroSerializer
    queryset = ClientesPimampiro.objects.all()