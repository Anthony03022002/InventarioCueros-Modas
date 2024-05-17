from django.db import models

# Create your models here.
class Factura(models.Model):
    proveedor = models.CharField(max_length=150)
    fecha = models.DateField()
    file = models.FileField(upload_to='files/')

    class Meta:
        db_table = 'factura'

    def __str__(self):
        return self.proveedor