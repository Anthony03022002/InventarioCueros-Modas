from rest_framework import viewsets
from .serializer import ventasBolivarSerializer
from .models import VentasBolivar

class ventasBolivarView(viewsets.ModelViewSet):
    serializer_class = ventasBolivarSerializer
    queryset = VentasBolivar.objects.all()