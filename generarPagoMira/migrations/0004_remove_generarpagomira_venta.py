# Generated by Django 5.0.6 on 2024-06-25 15:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('generarPagoMira', '0003_generarpagomira_cliente'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='generarpagomira',
            name='venta',
        ),
    ]
