from rest_framework import viewsets
from .serializer import devolucionesSerializer
from .models import Devoluciones

class DevolucionesView(viewsets.ModelViewSet):
    serializer_class = devolucionesSerializer
    queryset = Devoluciones.objects.all()