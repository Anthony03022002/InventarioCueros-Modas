# Generated by Django 5.0.6 on 2024-06-25 15:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('generarPagoBolivar', '0003_generarpagobolivar_cliente'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='generarpagobolivar',
            name='venta',
        ),
    ]
