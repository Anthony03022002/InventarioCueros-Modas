from rest_framework import viewsets
from .serializer import generarPagoPimampiroSerializer
from .models import generarPagoPimampiro

class GenerarPagoPimampiroView(viewsets.ModelViewSet):
    serializer_class = generarPagoPimampiroSerializer
    queryset = generarPagoPimampiro.objects.all()