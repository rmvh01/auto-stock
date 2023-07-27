from django.contrib import admin
from .models import Manufacturer, VehicleModel, Automobile


@admin.register(Automobile)
class AutomobileAdmin(admin.ModelAdmin):
    list_display = ["vin","sold"]
admin.site.register(Manufacturer)
admin.site.register(VehicleModel)
