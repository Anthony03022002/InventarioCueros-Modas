from django.db import models

# Create your models here.
class DevolucionesHistorial(models.Model):
    codigo = models.CharField(max_length=100)
    cantidad_devolucion = models.IntegerField()
    fecha = models.DateField()
    precio = models.DecimalField(max_digits=50,decimal_places=2)
    responsable = models.CharField(max_length=150)
    proveedor = models.CharField(max_length=150)
    comentario = models.TextField(blank=True, null=True)
    class Meta:
        db_table = 'devoluciones_historial'

    def __str__(self):
        return f"Historial de {self.codigo} - {self.cantidad_devolucion} unidades el {self.fecha}"
