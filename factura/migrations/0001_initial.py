# Generated by Django 5.0.6 on 2024-05-17 21:01

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Factura',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('proveedor', models.CharField(max_length=150)),
                ('fecha', models.DateField()),
                ('file', models.FileField(upload_to='files/')),
            ],
            options={
                'db_table': 'factura',
            },
        ),
    ]
