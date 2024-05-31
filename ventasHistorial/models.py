from django.db import models

# Create your models here.
class VentasHistorial(models.Model):
    codigo = models.CharField(max_length=100)
    cantidad_venta = models.IntegerField()
    fecha = models.DateField()
    precio = models.DecimalField(max_digits=50,decimal_places=2)
    comentario = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Historial de {self.codigo} - {self.cantidad_venta} unidades el {self.fecha}"
