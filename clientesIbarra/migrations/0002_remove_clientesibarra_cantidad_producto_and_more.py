# Generated by Django 5.0.6 on 2024-06-05 21:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('clientesIbarra', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='clientesibarra',
            name='cantidad_producto',
        ),
        migrations.RemoveField(
            model_name='clientesibarra',
            name='estado',
        ),
        migrations.RemoveField(
            model_name='clientesibarra',
            name='fecha_venta',
        ),
        migrations.RemoveField(
            model_name='clientesibarra',
            name='producto',
        ),
        migrations.RemoveField(
            model_name='clientesibarra',
            name='total_pagar',
        ),
    ]
