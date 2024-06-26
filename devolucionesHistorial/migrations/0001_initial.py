# Generated by Django 5.0.6 on 2024-05-31 19:43

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='DevolucionesHistorial',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('codigo', models.CharField(max_length=100)),
                ('cantidad_devolucion', models.IntegerField()),
                ('fecha', models.DateField()),
                ('precio', models.DecimalField(decimal_places=2, max_digits=50)),
                ('responsable', models.CharField(max_length=150)),
                ('comentario', models.TextField(blank=True, null=True)),
            ],
        ),
    ]
