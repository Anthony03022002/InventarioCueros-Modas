from rest_framework import viewsets
from .serializer import devolucionHistorialSerializer
from .models import DevolucionesHistorial

class DevolucionHistorialView(viewsets.ModelViewSet):
    serializer_class = devolucionHistorialSerializer
    queryset = DevolucionesHistorial.objects.all()