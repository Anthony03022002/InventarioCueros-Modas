# Generated by Django 5.0.6 on 2024-05-27 16:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('clientesAngel', '0006_clientesangel_productos_productoclienteangel'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='clientesangel',
            name='productos',
        ),
        migrations.DeleteModel(
            name='ProductoClienteAngel',
        ),
    ]
