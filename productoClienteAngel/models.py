from django.db import models

from clientesAngel.models import ClientesAngel
from inventario.models import Inventario

# Create your models here.
class ProductoClienteAngel(models.Model):
    total_pagar = models.DecimalField(max_digits=50,decimal_places=2)
    fecha_venta = models.DateField()
    estado = models.CharField(max_length=100)
    cliente = models.ForeignKey(ClientesAngel,blank=True,null=True, on_delete=models.SET_NULL)
    producto = models.ForeignKey(Inventario,blank=True,null=True, on_delete=models.SET_NULL)
    cantidad = models.IntegerField()

    class Meta:
        db_table = 'producto_cliente'

    def __str__(self):
        return f'{self.cliente.nombre_completo} - {self.producto.producto} ({self.cantidad})'