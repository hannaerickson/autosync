from django.urls import path

from .views import (
    api_technician,
    api_show_technician,
    api_appointments,
    api_change_appointment,
)

urlpatterns = [
    path("technicians/", api_technician, name="api_technician"),
    path("technicians/<int:id>/", api_show_technician, name="api_show_technician"),
    path("appointments/", api_appointments, name="api_appointments"),
    path("appointments/<int:id>/", api_change_appointment, name="api_change_appointment"),
]
