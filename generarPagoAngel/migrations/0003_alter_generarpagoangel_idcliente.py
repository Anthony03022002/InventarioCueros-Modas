# Generated by Django 5.0.6 on 2024-06-04 16:02

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('generarPagoAngel', '0002_alter_generarpagoangel_table'),
        ('productoClienteAngel', '0002_alter_productoclienteangel_cliente_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='generarpagoangel',
            name='idCliente',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='productoClienteAngel.productoclienteangel'),
        ),
    ]
