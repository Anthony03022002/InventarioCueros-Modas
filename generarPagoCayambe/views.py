from rest_framework import viewsets
from .serializer import generarPagoCayambeSerializer
from .models import generarPagoCayambe

class GenerarPagoCayambeView(viewsets.ModelViewSet):
    serializer_class = generarPagoCayambeSerializer
    queryset = generarPagoCayambe.objects.all() 