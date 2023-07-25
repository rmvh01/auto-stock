from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder

from .models import Technician, Appointment


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "employee_id",
        "first_name",
        "last_name",
    ]

class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "date_time",
        "reason",
        "technician",
        "vin",
        "customer",
    ]

    encoders= {
        "technician": TechnicianEncoder(),
    }

    def get_extra_data(self, o):
        return {"status": o.status.name}


@require_http_methods(["GET", "POST", "DELETE"])
def api_list_technicians(request, id=None):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            technicians,
            encoder=TechnicianEncoder,
            safe=False
        )
    elif request.method == "DELETE":
        count, _ = Technician.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        technician = Technician.objects.create(**content)
        return JsonResponse(
            technician,
            encoder=TechnicianEncoder,
            safe=False,
        )

@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            appointments,
            encoder=AppointmentEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        appointment = Appointment.create(**content)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )


@require_http_methods(["DELETE"])
def api_delete_appointment(request, id):
    count, _ = Appointment.objects.get(id=id).delete()
    return JsonResponse({"deleted": count > 0})

@require_http_methods(["PUT"])
def api_cancel_appointment(request, id):
    appointment = Appointment.objects.get(id=id)
    appointment.reject()
    return JsonResponse(
        appointment,
        encoder=AppointmentEncoder,
        safe=False,
    )

@require_http_methods(["PUT"])
def api_finish_appointment(request, id):
    appointment = Appointment.objects.get(id=id)
    appointment.finish()
    return JsonResponse(
        appointment,
        encoder=AppointmentEncoder,
        safe=False,
    )
