# Generated by Django 5.0.6 on 2024-06-25 15:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('generarPagoIbarra', '0003_generarpagoibarra_cliente'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='generarpagoibarra',
            name='venta',
        ),
    ]
