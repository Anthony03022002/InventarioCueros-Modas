from django.db import models

from clientesIbarra.models import ClientesIbarra
from inventario.models import Inventario

# Create your models here.
class VentasIbarra(models.Model):
    total_pagar = models.DecimalField(max_digits=50,decimal_places=2)
    fecha_venta = models.DateField()
    estado = models.CharField(max_length=100)
    cantidad = models.IntegerField()
    cantidad_adeudada = models.DecimalField(max_digits=50,decimal_places=2)
    cliente = models.ForeignKey(ClientesIbarra,blank=True,null=True, on_delete=models.SET_NULL)
    producto = models.ForeignKey(Inventario,blank=True,null=True, on_delete=models.SET_NULL)
    class Meta:
        db_table = 'ventas_ibarra'
