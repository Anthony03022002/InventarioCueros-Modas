# Generated by Django 5.0.6 on 2024-06-05 21:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('clientesLagoagrio', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='clienteslagoagrio',
            name='cantidad_producto',
        ),
        migrations.RemoveField(
            model_name='clienteslagoagrio',
            name='estado',
        ),
        migrations.RemoveField(
            model_name='clienteslagoagrio',
            name='fecha_venta',
        ),
        migrations.RemoveField(
            model_name='clienteslagoagrio',
            name='producto',
        ),
        migrations.RemoveField(
            model_name='clienteslagoagrio',
            name='total_pagar',
        ),
    ]
