from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from .models import Sale, Customer, SalesPerson, AutomobileVO
from .encoders import CustomerListEncoder, CustomerDetailEncoder, SalesPersonEncoder, AutomobileVOEncoder, SalesListEncoder


@require_http_methods(["GET"])
def list_automobile_vos(request):
    if request.method == "GET":
        automobiles = AutomobileVO.objects.all()
        return JsonResponse(
            {"automobiles": automobiles},
            encoder=AutomobileVOEncoder,
        )


@require_http_methods(["GET", "POST"])
def list_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerListEncoder,
        )
    else:
        content = json.loads(request.body)
        name = content["name"]
        address = content["address"]
        phone_number = content["phone_number"]
        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer,
            encoder=CustomerDetailEncoder,
            safe=False,
        )


@require_http_methods(["GET"])
def show_customer(request, id):
    if request.method == "GET":
        customer = Customer.objects.get(id=id)
        return JsonResponse(
            customer,
            encoder=CustomerDetailEncoder,
            safe=False,
        )


@require_http_methods(["GET", "POST"])
def list_sales_persons(request):
    if request.method == "GET":
        sales_persons = SalesPerson.objects.all()
        return JsonResponse(
            {"sales_persons": sales_persons},
            encoder=SalesPersonEncoder,
        )
    else:
        content = json.loads(request.body)
        name = content["name"]
        employee_number = content["employee_number"]
        sales_person = SalesPerson.objects.create(**content)
        return JsonResponse(
            sales_person,
            encoder=SalesPersonEncoder,
            safe=False
        )


@require_http_methods(["GET", "POST"])
def list_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SalesListEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            sales_person = content["sales_person"]
            sp = SalesPerson.objects.get(employee_number=sales_person)
            content["sales_person"] = sp
            customer_id = content["customer"]
            customer = Customer.objects.get(id=customer_id)
            content["customer"] = customer
            vin = content["automobile"]
            auto = AutomobileVO.objects.get(vin=vin)
            content["automobile"] = auto
            price = content["price"]
            sale = Sale.objects.create(**content)
            return JsonResponse(
                sale,
                encoder=SalesListEncoder,
                safe=False,
            )

        except (SalesPerson.DoesNotExist, Customer.DoesNotExist, AutomobileVO.DoesNotExist):
            return JsonResponse(
                {"message": "invalid information"},
                status=200,
            )
