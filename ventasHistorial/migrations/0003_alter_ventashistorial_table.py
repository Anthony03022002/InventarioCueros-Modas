# Generated by Django 5.0.6 on 2024-06-05 22:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ventasHistorial', '0002_ventashistorial_precio'),
    ]

    operations = [
        migrations.AlterModelTable(
            name='ventashistorial',
            table='ventas_historial',
        ),
    ]