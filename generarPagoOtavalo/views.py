from rest_framework import viewsets
from .serializer import generarPagoOtavaloSerializer
from .models import generarPagoOtavalo

class GenerarPagoOtavaloView(viewsets.ModelViewSet):
    serializer_class = generarPagoOtavaloSerializer
    queryset = generarPagoOtavalo.objects.all()