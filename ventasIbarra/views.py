from rest_framework import viewsets
from .serializer import ventasIbarraSerializer
from .models import VentasIbarra

class ventasIbarraView(viewsets.ModelViewSet):
    serializer_class = ventasIbarraSerializer
    queryset = VentasIbarra.objects.all()