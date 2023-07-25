from django.db import models
from django.urls import reverse

# Create your models here.

class Technician(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=100)

    def get_api_url(self):
        # probably wrong
        return reverse("api_list_technicians", kwargs={"id": "pk"})


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17)
    sold = models.BooleanField()


# a value object
class Status(models.Model):
    name = models.CharField(max_length=10)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ("id",)
        verbose_name_plural = "statuses"


class Appointment(models.Model):
    date_time = models.DateTimeField()
    reason = models.CharField(max_length=100)
    status = models.ForeignKey(
        Status,
        on_delete=models.PROTECT,
        related_name="status",
    )
    vin = models.CharField(max_length=17)
    customer = models.CharField(max_length=100)
    technician = models.ForeignKey(
        Technician,
        on_delete=models.PROTECT,
        related_name="technician",
    )

    def get_api_url(self):
        # probably will need to be changed
        return reverse("api_list_appointments")

    @classmethod
    def create(cls, **content):
        content["status"] = Status.objects.get(name="CREATED")
        appointment = cls(**content)
        appointment.save()
        return appointment

    def cancel(self):
        status = Status.objects.get(name="CANCELED")
        self.status = status
        self.save()

    def finish(self):
        status = Status.objects.get(name="FINISHED")
        self.status = status
        self.save()
