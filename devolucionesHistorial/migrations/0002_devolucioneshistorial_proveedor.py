# Generated by Django 5.0.6 on 2024-05-31 20:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('devolucionesHistorial', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='devolucioneshistorial',
            name='proveedor',
            field=models.CharField(default=234, max_length=150),
            preserve_default=False,
        ),
    ]
