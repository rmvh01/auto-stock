# Generated by Django 4.0.3 on 2023-07-25 20:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory_rest', '0002_automobile_sold'),
    ]

    operations = [
        migrations.AlterField(
            model_name='automobile',
            name='vin',
            field=models.CharField(max_length=17),
        ),
    ]
