from django.db import models

from factura.models import Factura

# Create your models here.
class Inventario(models.Model):
    codigo = models.CharField(max_length=150)
    producto = models.CharField(max_length=150)
    cantidad_ingresar = models.IntegerField()
    precio = models.DecimalField(max_digits=100,decimal_places=2)
    stock = models.IntegerField()
    descripcion = models.CharField(max_length=200)
    talla = models.CharField(max_length=30)
    fecha_ingresa_producto = models.DateField()
    modelo = models.CharField(max_length=30)
 

#ForeignKey
    proveedor = models.ForeignKey(Factura, null=True, blank=True, on_delete=models.SET_NULL)


    class Meta:
        db_table = 'inventario'

    def __str__(self):
        return self.producto