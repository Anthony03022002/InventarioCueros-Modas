from django.db import models

from clientesLagoagrio.models import ClientesLagoagrio
from ventasLagoagrio.models import VentasLagoagrio


class generarPagoLagoagrio(models.Model):
    fecha_pago = models.DateField()
    cantidad_pagada = models.DecimalField(max_digits=50, decimal_places=2, null=True, blank=True)
    venta = models.ForeignKey(VentasLagoagrio, null=True, blank=True, on_delete=models.SET_NULL)

    class Meta:
        db_table = 'genera_pago_lagoagrio'
