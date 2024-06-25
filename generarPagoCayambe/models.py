from django.db import models

from clientesCayambe.models import ClientesCayambe


class generarPagoCayambe(models.Model):
    fecha_pago = models.DateField()
    cantidad_pagada = models.DecimalField(max_digits=50, decimal_places=2, null=True, blank=True)
    cliente = models.ForeignKey(ClientesCayambe, null=True, blank=True, on_delete=models.SET_NULL)

    class Meta:
        db_table = 'genera_pago_cayambe'
