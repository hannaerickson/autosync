from django.urls import path
from .views import (
    list_customers,
    show_customer,
    list_sales_persons,
    show_sales_person,
    list_sales,
    list_automobile_vos,
)

urlpatterns = [
    path("customers/", list_customers, name="list_customers"),
    path("customers/<int:id>/", show_customer, name="show_customer"),
    path("salespersons/", list_sales_persons, name="list_sales_persons"),
    path("salespersons/<int:id>/", show_sales_person, name="show_sales_person"),
    path("sales/", list_sales, name="list_sales"),
    path("automobilevos/", list_automobile_vos, name="list_automobile_vos"),
]
