from rest_framework import viewsets
from .serializer import stockHistoriaSerializer
from .models import StockHistoria

class stockHistoriaView(viewsets.ModelViewSet):
    serializer_class = stockHistoriaSerializer
    queryset = StockHistoria.objects.all()