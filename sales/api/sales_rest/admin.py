from django.contrib import admin
from .models import AutomobileVO, Customer, SalesPerson, Sale

# Register your models here.

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ["name"]

@admin.register(SalesPerson)
class SalesPersonAdmin(admin.ModelAdmin):
    list_display = ["name"]

@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
    pass

@admin.register(AutomobileVO)
class AutomobileVOAdmin(admin.ModelAdmin):
    list_display = ["vin"]
