from rest_framework import viewsets
from .serializer import clientesMiraSerializer
from .models import ClientesMira

class ClientesMiraView(viewsets.ModelViewSet):
    serializer_class = clientesMiraSerializer
    queryset = ClientesMira.objects.all()