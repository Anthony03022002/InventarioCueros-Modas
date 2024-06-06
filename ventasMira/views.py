from rest_framework import viewsets
from .serializer import ventasMiraSerializer
from .models import VentasMira

class ventasMiraView(viewsets.ModelViewSet):
    serializer_class = ventasMiraSerializer
    queryset = VentasMira.objects.all()