from django.db import models

# Create your models here.

from clientesPimampiro.models import ClientesPimampiro


class generarPagoPimampiro(models.Model):
    fecha_pago = models.DateField()
    cantidad_pagada = models.DecimalField(max_digits=50, decimal_places=2, null=True, blank=True)
    cliente = models.ForeignKey(ClientesPimampiro, null=True, blank=True, on_delete=models.SET_NULL)

    class Meta:
        db_table = 'generar_pago_pimampiro'