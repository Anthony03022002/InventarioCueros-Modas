from django.db import models

from inventario.models import Inventario

# Create your models here.
class ClientesLagoagrio(models.Model):
    cedula = models.BigIntegerField()
    nombre_completo = models.CharField(max_length=150)
    email = models.EmailField(max_length=120)
    celular = models.CharField(max_length=20)
    direccion = models.CharField(max_length=250)
    
    class Meta:
        db_table = 'clientes_lagoagrio'
        
    def __str__(self):
        return self.nombre_completo