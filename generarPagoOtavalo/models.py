from django.db import models

# Create your models here.
from clientesOtavalo.models import ClientesOtavalo


class generarPagoOtavalo(models.Model):
    fecha_pago = models.DateField()
    cantidad_pagada = models.DecimalField(max_digits=50, decimal_places=2, null=True, blank=True)
    idCliente = models.ForeignKey(ClientesOtavalo, null=True, blank=True, on_delete=models.SET_NULL)

    class Meta:
        db_table = 'generar_pago_otavalo'