from django.urls import path
from .views import list_customers, show_customer, list_sales_persons, list_sales

urlpatterns = [
    path("customers/", list_customers, name="list_customers"),
    path("customers/<int:id>/", show_customer, name="show_customer"),
    path("salespersons/", list_sales_persons, name="list_sales_persons"),
    path("sales/", list_sales, name="list_sales"),
]
