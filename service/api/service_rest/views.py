from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import AutomobileVO, Technician, Appointment
from common.json import ModelEncoder
import json

# api_technicians
# need to create a technician

# api appointments
# need to create an appointment
# also need to list all appointments
# delete appointment

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        # "import_href"
    ]

class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "name",
        "employee_number",
    ]

class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "vin",
        "owner",
        "date",
        "technician",
        "reason",
        "vip_status",
        "status",
    ]
    encoders = {
        "technician": TechnicianEncoder(),
    }

@require_http_methods(["GET", "POST"])
def api_technician(request):
    if request.method == "GET":
        techs = Technician.objects.all()
        return JsonResponse(
            {"techs": techs},
            encoder=TechnicianEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            name = content["name"]
            employee_number = content["employee_number"]
            tech = Technician.objects.create(**content)
            return JsonResponse(
                tech,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the technician"}
            )
            response.status_code = 400
            return response


@require_http_methods(["GET", "POST"])
def api_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            vin = content["vin"]
            try:
                auto = AutomobileVO.objects.get(vin=vin)
                content["vip_status"] = "VIP"
            except AutomobileVO.DoesNotExist:
                vin = content["vin"]
                content["vip_status"] = ""
            owner = content["owner"]
            date = content["date"]
            reason = content["reason"]
            technician = content["technician"]
            tech = Technician.objects.get(employee_number=technician)
            content["technician"] = tech
            appointment = Appointment.objects.create(**content)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            response = JsonResponse({"message": "Tech does not exist"})
            response.status_code = 404
            return response

@require_http_methods(["DELETE", "PUT"])
def api_change_appointment(request, vin):
    if request.method == "DELETE":
        try:
            appointment = Appointment.objects.get(vin=vin)
            appointment.delete()
            return JsonResponse({"message": "Appointment deleted"})
        except Appointment.DoesNotExist:
            return JsonResponse({"message": "Appointment for that VIN does not exist"})
    else:
        content = json.loads(request.body)
        status = content["status"]
        Appointment.objects.filter(vin=vin).update(**content)
        appointment = Appointment.objects.get(vin=vin)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )
