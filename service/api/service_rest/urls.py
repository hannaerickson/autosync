from django.urls import path

from .views import (
    api_technician,
    api_appointments,
)

urlpatterns = [
    path("technicians/", api_technician, name="api_technician"),
    path("appointments/", api_appointments, name="api_appointments"),
]
