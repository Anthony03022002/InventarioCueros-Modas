from rest_framework import viewsets
from .serializer import generarPagoAtuntaquiSerializer
from .models import generarPagoAtuntaqui

class GenerarPagoAtuntaquiView(viewsets.ModelViewSet):
    serializer_class = generarPagoAtuntaquiSerializer
    queryset = generarPagoAtuntaqui.objects.all()