# Generated by Django 5.0.6 on 2024-06-19 15:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stockHistoria', '0005_alter_stockhistoria_table'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stockhistoria',
            name='codigo',
            field=models.CharField(max_length=200),
        ),
    ]
