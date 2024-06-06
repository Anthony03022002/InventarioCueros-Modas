# Generated by Django 5.0.6 on 2024-06-05 21:53

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('clientesBolivar', '0002_remove_clientesbolivar_cantidad_producto_and_more'),
        ('inventario', '0002_alter_inventario_table'),
    ]

    operations = [
        migrations.CreateModel(
            name='VentasBolivar',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('total_pagar', models.DecimalField(decimal_places=2, max_digits=50)),
                ('fecha_venta', models.DateField()),
                ('estado', models.CharField(max_length=100)),
                ('cantidad', models.IntegerField()),
                ('cliente', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='clientesBolivar.clientesbolivar')),
                ('producto', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='inventario.inventario')),
            ],
        ),
    ]
