# Generated by Django 5.0.6 on 2024-06-25 15:44

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clientesOtavalo', '0002_remove_clientesotavalo_cantidad_producto_and_more'),
        ('generarPagoOtavalo', '0002_remove_generarpagootavalo_idcliente_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='generarpagootavalo',
            name='cliente',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='clientesOtavalo.clientesotavalo'),
        ),
    ]
