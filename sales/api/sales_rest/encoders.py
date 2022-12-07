from common.json import ModelEncoder
from .models import Customer, SalesPerson, Sale, AutomobileVO


class CustomerListEncoder(ModelEncoder):
    model = Customer
    properties = [
        "id",
        "name",
    ]


class CustomerDetailEncoder(ModelEncoder):
    model = Customer
    properties = [
        "id",
        "name",
        "address",
        "phone_number",
    ]


class SalesPersonEncoder(ModelEncoder):
    model = SalesPerson
    properties = [
        "name",
        "employee_number",
    ]

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin"]


class SalesListEncoder(ModelEncoder):
    model = Sale
    properties = [
        "id",
        "sales_person",
        "customer",
        "automobile",
        "price",
    ]
    encoders = {
        "sales_person": SalesPersonEncoder(),
        "customer": CustomerListEncoder(),
        "automobile": AutomobileVOEncoder(),
    }
