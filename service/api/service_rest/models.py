from django.db import models

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)

    def __str__(self):
        return self.vin

class Technician(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.PositiveSmallIntegerField()

    def __str__(self):
        return self.name

class Appointment(models.Model):
    vin = models.CharField(max_length=17, default="")
    owner = models.CharField(max_length=100)
    date = models.DateField()
    time = models.TimeField()
    technician = models.ForeignKey(
        "Technician",
        related_name="appointments",
        on_delete=models.CASCADE,
    )
    reason = models.CharField(max_length=200, default="")
    vip_status = models.CharField(max_length=10, default="")
    status = models.CharField(max_length=100, default="INCOMPLETE")
