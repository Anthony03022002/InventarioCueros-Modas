# Generated by Django 5.0.6 on 2024-06-25 15:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('generarPagoOtavalo', '0003_generarpagootavalo_cliente'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='generarpagootavalo',
            name='venta',
        ),
    ]
