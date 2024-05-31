# Generated by Django 5.0.6 on 2024-05-31 18:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stockHistoria', '0003_alter_stockhistoria_fecha'),
    ]

    operations = [
        migrations.AddField(
            model_name='stockhistoria',
            name='precio',
            field=models.DecimalField(decimal_places=2, default=2334, max_digits=50),
            preserve_default=False,
        ),
    ]