from rest_framework import viewsets
from .serializer import generarPagoBolivarSerializer
from .models import generarPagoBolivar

class GenerarPagoBolivarView(viewsets.ModelViewSet):
    serializer_class = generarPagoBolivarSerializer
    queryset = generarPagoBolivar.objects.all()