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
        "vin",
        "owner",
        "date",
        "technician",
        "reason",
    ]
    encoders = {
        "vin": AutomobileVOEncoder(),
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
            auto = AutomobileVO.objects.get(vin=vin)
            content["vin"] = auto
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
        except (AutomobileVO.DoesNotExist, Technician.DoesNotExist):
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
