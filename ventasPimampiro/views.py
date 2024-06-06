from rest_framework import viewsets
from .serializer import ventasPimampiroSerializer
from .models import VentasPimampiro

class ventasPimampiroView(viewsets.ModelViewSet):
    serializer_class = ventasPimampiroSerializer
    queryset = VentasPimampiro.objects.all()