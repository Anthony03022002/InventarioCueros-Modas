# Generated by Django 5.0.6 on 2024-06-05 21:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('clientesBolivar', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='clientesbolivar',
            name='cantidad_producto',
        ),
        migrations.RemoveField(
            model_name='clientesbolivar',
            name='estado',
        ),
        migrations.RemoveField(
            model_name='clientesbolivar',
            name='fecha_venta',
        ),
        migrations.RemoveField(
            model_name='clientesbolivar',
            name='producto',
        ),
        migrations.RemoveField(
            model_name='clientesbolivar',
            name='total_pagar',
        ),
    ]
