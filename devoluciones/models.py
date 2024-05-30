from django.db import models

from factura.models import Factura
from inventario.models import Inventario

# Create your models here.
class Devoluciones(models.Model):
    devolucion = models.CharField(max_length=100)
    cantidad_devolver = models.IntegerField()
    precio = models.DecimalField(max_digits=100,decimal_places=2)
    stock = models.IntegerField()
    talla = models.CharField(max_length=30)
    fecha_devolucion = models.DateField()
    modelo = models.CharField(max_length=30)
    observacion = models.CharField(max_length=500)
    responsable = models.CharField(max_length=50)
 

#ForeignKey
    proveedor = models.ForeignKey(Factura, null=True, blank=True, on_delete=models.SET_NULL)
    producto = models.ForeignKey(Inventario,blank=True,null=True, on_delete=models.SET_NULL)
    class Meta:
        db_table = 'devoluciones'

    def __str__(self):
        return self.responsable