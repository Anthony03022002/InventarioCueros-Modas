from rest_framework import viewsets
from .serializer import generarPagoMiraSerializer
from .models import generarPagoMira

class GenerarPagoMiraView(viewsets.ModelViewSet):
    serializer_class = generarPagoMiraSerializer
    queryset = generarPagoMira.objects.all()