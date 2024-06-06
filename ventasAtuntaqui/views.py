from rest_framework import viewsets
from .serializer import ventasAtuntaquiSerializer
from .models import VentasAtuntaqui

class ventasAtuntaquiView(viewsets.ModelViewSet):
    serializer_class = ventasAtuntaquiSerializer
    queryset = VentasAtuntaqui.objects.all()