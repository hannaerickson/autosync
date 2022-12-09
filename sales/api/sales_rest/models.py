from django.db import models

# Create your models here.

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)


class SalesPerson(models.Model):
    name = models.CharField(max_length=50)
    employee_number = models.PositiveSmallIntegerField(unique=True)


class Customer(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=20)


class Sale(models.Model):
    price = models.CharField(max_length=20)
    customer = models.ForeignKey(
        "Customer",
        related_name="sale",
        on_delete=models.CASCADE
    )
    sales_person = models.ForeignKey(
        "SalesPerson",
        related_name="sale",
        on_delete=models.CASCADE
    )
    automobile = models.ForeignKey(
        "AutomobileVO",
        related_name="sale",
        on_delete=models.CASCADE
    )
