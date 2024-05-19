from django.db import models

from factura.models import Factura
from inventario.models import Inventario

# Create your models here.
class Devoluciones(models.Model):
    codigo = models.CharField(max_length=150)
    producto = models.CharField(max_length=150)
    cantidad_devolver = models.IntegerField()
    precio = models.DecimalField(max_digits=100,decimal_places=2)
    stock = models.IntegerField()
    descripcion = models.CharField(max_length=200)
    talla = models.CharField(max_length=30)
    fecha_devolucion = models.DateField()
    modelo = models.CharField(max_length=30)
    observacion = models.CharField(max_length=500)
    responsable = models.CharField(max_length=50)
 

#ForeignKey
    proveedor = models.ForeignKey(Factura, null=True, blank=True, on_delete=models.SET_NULL)


    class Meta:
        db_table = 'devoluciones'

    def __str__(self):
        return self.producto