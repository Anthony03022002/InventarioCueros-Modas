# Generated by Django 5.0.6 on 2024-06-25 15:32

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clientesAtuntaqui', '0002_remove_clientesatuntaqui_cantidad_producto_and_more'),
        ('generarPagoAtuntaqui', '0003_remove_generarpagoatuntaqui_idcliente_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='generarpagoatuntaqui',
            name='cliente',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='clientesAtuntaqui.clientesatuntaqui'),
        ),
    ]
