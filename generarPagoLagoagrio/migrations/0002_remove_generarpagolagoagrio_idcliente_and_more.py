# Generated by Django 5.0.6 on 2024-06-05 22:21

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('generarPagoLagoagrio', '0001_initial'),
        ('ventasLagoagrio', '0002_alter_ventaslagoagrio_table'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='generarpagolagoagrio',
            name='idCliente',
        ),
        migrations.AddField(
            model_name='generarpagolagoagrio',
            name='venta',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='ventasLagoagrio.ventaslagoagrio'),
        ),
        migrations.AlterModelTable(
            name='generarpagolagoagrio',
            table='genera_pago_lagoagrio',
        ),
    ]
