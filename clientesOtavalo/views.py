from rest_framework import viewsets
from .serializer import clientesOtavaloSerializer
from .models import ClientesOtavalo

class ClientesOtavaloView(viewsets.ModelViewSet):
    serializer_class = clientesOtavaloSerializer
    queryset = ClientesOtavalo.objects.all()