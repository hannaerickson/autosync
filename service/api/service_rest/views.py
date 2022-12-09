from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import AutomobileVO, Technician, Appointment
from .encoders import AutomobileVO, TechnicianEncoder, AppointmentEncoder
import json

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
            return JsonResponse(
                {"message": "Could not create the technician"},
                status=404,
            )

@require_http_methods(["GET", "DELETE", "PUT"])
def api_show_technician(request, id):
    if request.method == "GET":
        try:
            tech = Technician.objects.get(id=id)
            return JsonResponse(
                tech,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Technician does not exist"},
                status=404,
            )
    elif request.method == "DELETE":
        try:
            tech = Technician.objects.get(id=id).delete()
            return JsonResponse({"message": "Technician deleted"})
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Technician does not exist"},
                status=404,
            )
    else:
        content = json.loads(request.body)
        tech = Technician.objects.get(id=id)
        name = content["name"]
        employee_number = content["employee_number"]
        Technician.objects.filter(id=id).update(**content)
        tech = Technician.objects.get(id=id)
        return JsonResponse(
            tech,
            encoder=TechnicianEncoder,
            safe=False,
        )


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
            time = content["time"]
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

@require_http_methods(["GET", "DELETE", "PUT"])
def api_change_appointment(request, id):
    if request.method == "GET":
        try:
            appointment = Appointment.objects.get(id=id)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            return JsonResponse({"message": "Appointment does not exist"})
    elif request.method == "DELETE":
        try:
            appointment = Appointment.objects.get(id=id)
            appointment.delete()
            return JsonResponse({"message": "Appointment deleted"})
        except Appointment.DoesNotExist:
            return JsonResponse({"message": "Appointment does not exist"})
    else:
        content = json.loads(request.body)
        status = content["status"]
        Appointment.objects.filter(id=id).update(**content)
        appointment = Appointment.objects.get(id=id)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )
