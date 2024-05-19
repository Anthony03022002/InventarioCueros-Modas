from rest_framework import viewsets
from .serializer import generarPagoIbarraSerializer
from .models import generarPagoIbarra

class GenerarPagoIbarraView(viewsets.ModelViewSet):
    serializer_class = generarPagoIbarraSerializer
    queryset = generarPagoIbarra.objects.all()