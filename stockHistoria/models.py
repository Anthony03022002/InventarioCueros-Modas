from django.db import models
# Create your models here.
class StockHistoria(models.Model):
    codigo = models.CharField(max_length=100)
    cantidad_ingresada = models.IntegerField()
    fecha = models.DateField()
    comentario = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Historial de {self.codigo} - {self.cantidad_ingresada} unidades el {self.fecha}"