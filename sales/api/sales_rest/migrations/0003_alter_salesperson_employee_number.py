# Generated by Django 4.0.3 on 2022-12-09 00:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0002_alter_sale_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='salesperson',
            name='employee_number',
            field=models.PositiveSmallIntegerField(unique=True),
        ),
    ]
