from rest_framework import viewsets
from .serializer import ventasOtavaloSerializer
from .models import VentasOtavalo

class ventasOtavaloView(viewsets.ModelViewSet):
    serializer_class = ventasOtavaloSerializer
    queryset = VentasOtavalo.objects.all()