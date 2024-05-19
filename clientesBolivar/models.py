from django.db import models

from inventario.models import Inventario

# Create your models here.
class ClientesBolivar(models.Model):
    cedula = models.BigIntegerField()
    nombre_completo = models.CharField(max_length=150)
    email = models.EmailField(max_length=120)
    celular = models.CharField(max_length=20)
    direccion = models.CharField(max_length=250)
    cantidad_producto = models.IntegerField()
    total_pagar = models.DecimalField(max_digits=50,decimal_places=2)
    fecha_venta = models.DateField()
    estado = models.CharField(max_length=100)

    #ManyToMany
    producto = models.ManyToManyField(Inventario)
    
    class Meta:
        db_table = 'clientes_bolivar'
        
    def __str__(self):
        return self.nombre_completo
