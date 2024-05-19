# Generated by Django 5.0.6 on 2024-05-18 17:19

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('inventario', '0002_alter_inventario_table'),
    ]

    operations = [
        migrations.CreateModel(
            name='ClientesAtuntaqui',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cedula', models.BigIntegerField()),
                ('nombre_completo', models.CharField(max_length=150)),
                ('email', models.EmailField(max_length=120)),
                ('celular', models.CharField(max_length=20)),
                ('direccion', models.CharField(max_length=250)),
                ('cantidad_producto', models.IntegerField()),
                ('total_pagar', models.DecimalField(decimal_places=2, max_digits=50)),
                ('fecha_venta', models.DateField()),
                ('estado', models.CharField(max_length=100)),
                ('producto', models.ManyToManyField(to='inventario.inventario')),
            ],
            options={
                'db_table': 'clientes_atuntaqui',
            },
        ),
    ]
