# Generated by Django 4.0.3 on 2022-12-06 22:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='automobilevo',
            name='import_href',
            field=models.CharField(default='', max_length=200, unique=True),
        ),
    ]
